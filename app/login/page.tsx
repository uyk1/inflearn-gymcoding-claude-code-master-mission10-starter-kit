"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// 로그인 입력값 검증 규칙입니다. 실제 인증 API가 없는 데모이므로 형식만 확인합니다
const loginSchema = z.object({
  email: z.email("유효한 이메일 주소를 입력하세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 실제 로그인 요청 없이 제출 완료만 안내하는 데모입니다
  function onSubmit() {
    setMessage("로그인 요청이 제출되었습니다. (데모 페이지)");
    form.reset();
  }

  return (
    <div className="flex items-center justify-center py-8 sm:py-16">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            이메일과 비밀번호를 입력해 계정에 로그인하세요.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit, () => setMessage(null))}
            noValidate
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="8자 이상 입력"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                로그인
              </Button>

              {/* 상태 영역을 항상 렌더링해야 스크린 리더가 내용 변경을 읽습니다 */}
              <p
                role="status"
                className="min-h-5 text-center text-sm text-muted-foreground"
              >
                {message}
              </p>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="justify-center gap-1 text-sm text-muted-foreground">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
