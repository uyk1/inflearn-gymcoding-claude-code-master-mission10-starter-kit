import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const features = ["TypeScript", "Tailwind CSS", "shadcn/ui"];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Next.js Starter Kit</h1>
        <p className="text-muted-foreground text-lg">
          Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/form-example" className={buttonVariants()}>
            폼 예제 보기
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature}>
              <CardHeader>
                <CardTitle>{feature}</CardTitle>
                <CardDescription>기본 구성에 포함된 기술</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  새 프로젝트의 출발점으로 사용할 수 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  자세히
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-md space-y-4">
        <h2 className="text-2xl font-semibold">Input / Textarea</h2>
        <Field>
          <FieldLabel htmlFor="demo-input">이메일</FieldLabel>
          <Input id="demo-input" type="email" placeholder="name@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="demo-textarea">메모</FieldLabel>
          <Textarea id="demo-textarea" placeholder="내용을 입력하세요" />
        </Field>
      </section>
    </div>
  );
}
