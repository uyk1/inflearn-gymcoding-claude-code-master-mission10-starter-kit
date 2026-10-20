"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 유효성 검사 규칙을 한 곳에 모아 타입과 검증을 함께 관리합니다
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .max(50, "이름은 50자 이하여야 합니다."),
  email: z.email("유효한 이메일 주소를 입력하세요."),
  message: z
    .string()
    .min(10, "메시지는 10자 이상이어야 합니다.")
    .max(500, "메시지는 500자 이하여야 합니다."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function FormExamplePage() {
  const [submitted, setSubmitted] = useState<ContactFormValues | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 실제 API 호출 없이 입력값을 화면에 보여주는 데모입니다
  function onSubmit(values: ContactFormValues) {
    setSubmitted(values);
    form.reset();
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h1 className="text-3xl font-bold">폼 예제</h1>
        <p className="text-muted-foreground mt-2">
          react-hook-form + zod 유효성 검사 데모
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>문의하기</CardTitle>
          <CardDescription>모든 항목을 작성한 뒤 제출하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">이름</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="홍길동"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>실명을 입력하세요.</FieldDescription>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
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
                      placeholder="name@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="message">메시지</FieldLabel>
                    <Textarea
                      {...field}
                      id="message"
                      rows={4}
                      className="resize-none"
                      placeholder="문의 내용을 입력하세요"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>10자 이상 500자 이하</FieldDescription>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                제출하기
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {submitted && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-green-600">제출 완료</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted overflow-auto rounded p-3 text-sm">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
