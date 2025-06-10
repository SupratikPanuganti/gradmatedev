import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Book, Mail, Lightbulb } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GradMate
              </span>
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Your platform for research opportunities and essay improvement
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Research Email Generator
            </CardTitle>
            <CardDescription>Create professional emails to reach out to research labs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <p className="mb-4 text-sm text-muted-foreground">
              Select your target school and lab to generate a personalized email template for research opportunities.
            </p>
            <div className="mt-auto">
              <Button asChild className="w-full">
                <Link href="/research-emails">Get Started</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Essay Idea Generator
            </CardTitle>
            <CardDescription>Get personalized essay topic suggestions based on your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <p className="mb-4 text-sm text-muted-foreground">
              Input your essay prompt and get tailored brainstorming ideas based on your experiences and background.
            </p>
            <div className="mt-auto">
              <Button asChild className="w-full">
                <Link href="/essay-ideas">Generate Ideas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              College Essay Grader
            </CardTitle>
            <CardDescription>Get AI-powered feedback on your college essays</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <p className="mb-4 text-sm text-muted-foreground">
              Upload your essay and receive detailed feedback on structure, clarity, style, and emotional impact.
            </p>
            <div className="mt-auto">
              <Button asChild className="w-full">
                <Link href="/essay-review">Analyze Essay</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
