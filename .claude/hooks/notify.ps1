param(
  [string]$Title = 'Claude Code',
  [string]$Message = ''
)

# stdin 인코딩을 UTF-8로 맞춰 한국어 JSON이 깨지지 않게 합니다
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

# Notification 훅은 -Message 대신 stdin JSON의 message 필드를 사용합니다
if (-not $Message -and [Console]::IsInputRedirected) {
  try {
    $payload = [Console]::In.ReadToEnd() | ConvertFrom-Json
    if ($payload.message) { $Message = [string]$payload.message }
  } catch {
    # 파싱 실패는 알림 생략으로 처리하고 작업을 막지 않습니다
  }
}

# 효과음은 토스트 성공 여부와 무관하게 재생합니다
[System.Media.SystemSounds]::Asterisk.Play()

try {
  # WinRT 토스트: Windows PowerShell 5.1에서만 동작하는 방식입니다
  [void][Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime]
  [void][Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime]

  $template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)
  $texts = $template.GetElementsByTagName('text')
  $texts.Item(0).AppendChild($template.CreateTextNode($Title)) | Out-Null
  $texts.Item(1).AppendChild($template.CreateTextNode($Message)) | Out-Null

  $toast = [Windows.UI.Notifications.ToastNotification]::new($template)
  $appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
  [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show($toast)
} catch {
  # 토스트가 막힌 환경에서는 트레이 풍선 알림으로 대체합니다
  Add-Type -AssemblyName System.Windows.Forms
  $icon = New-Object System.Windows.Forms.NotifyIcon
  $icon.Icon = [System.Drawing.SystemIcons]::Information
  $icon.Visible = $true
  $icon.ShowBalloonTip(5000, $Title, $Message, [System.Windows.Forms.ToolTipIcon]::Info)
  Start-Sleep -Seconds 6
  $icon.Dispose()
}

exit 0
