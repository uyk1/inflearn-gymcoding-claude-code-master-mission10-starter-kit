"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 서버에서는 테마를 알 수 없으므로, 마운트 후에만 아이콘을 그립니다
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 마운트 전에도 같은 크기를 차지해 레이아웃이 밀리지 않게 합니다
    return <div className="size-8" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="테마 전환"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
