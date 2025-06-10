"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"

interface ProfileData {
  name: string
  school: string
  major: string
  minor: string
  gpa: string
  resume: File | null
  certifications: string[]
  projects: string
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    school: "",
    major: "",
    minor: "",
    gpa: "",
    resume: null,
    certifications: [""],
    projects: "",
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileData((prev) => ({ ...prev, resume: e.target.files![0] }))
      setSaved(false)
    }
  }

  const handleCertificationChange = (index: number, value: string) => {
    const updatedCertifications = [...profileData.certifications]
    updatedCertifications[index] = value
    setProfileData((prev) => ({ ...prev, certifications: updatedCertifications }))
    setSaved(false)
  }

  const addCertification = () => {
    setProfileData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, ""],
    }))
    setSaved(false)
  }

  const removeCertification = (index: number) => {
    const updatedCertifications = [...profileData.certifications]
    updatedCertifications.splice(index, 1)
    setProfileData((prev) => ({
      ...prev,
      certifications: updatedCertifications,
    }))
    setSaved(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Save to localStorage for use in other components
    localStorage.setItem("gradmate-profile", JSON.stringify(profileData))

    // Mock API call - in a real app, you would send the data to your backend
    setTimeout(() => {
      setSaving(false)
      setSaved(true)

      // Reset saved status after 3 seconds
      setTimeout(() => {
        setSaved(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile information to personalize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  name="school"
                  placeholder="University of Example"
                  value={profileData.school}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  name="major"
                  placeholder="Computer Science"
                  value={profileData.major}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minor">Minor (Optional)</Label>
                <Input
                  id="minor"
                  name="minor"
                  placeholder="Mathematics"
                  value={profileData.minor}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input id="gpa" name="gpa" placeholder="3.8" value={profileData.gpa} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("resume-upload")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {profileData.resume ? "Change Resume" : "Upload Resume"}
                  </Button>
                  <input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />
                </div>
                {profileData.resume && (
                  <div className="mt-2 flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                    <span className="truncate">{profileData.resume.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setProfileData((prev) => ({ ...prev, resume: null }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Certifications</Label>
                <Button type="button" variant="outline" size="sm" onClick={addCertification}>
                  Add Certification
                </Button>
              </div>
              <div className="space-y-2">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={cert}
                      onChange={(e) => handleCertificationChange(index, e.target.value)}
                      placeholder="e.g., AWS Certified Developer"
                    />
                    {profileData.certifications.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCertification(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projects">Projects</Label>
              <Textarea
                id="projects"
                name="projects"
                placeholder="Describe your projects, one per line"
                className="min-h-[120px]"
                value={profileData.projects}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving..." : saved ? "Saved!" : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
