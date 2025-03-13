import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Me | Portfolio',
  description: 'Learn more about my background, skills, and experience',
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
        <p className="text-xl text-muted-foreground">
          Get to know more about my background, skills, and experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square rounded-lg overflow-hidden border border-border/40">
          <Image
            src="/placeholder-about.jpg"
            alt="Profile Image"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Hi, I'm [Your Name]</h2>
          <p className="text-muted-foreground">
            I'm a passionate web developer and designer with a focus on creating beautiful, functional, and user-friendly websites and applications.
          </p>
          <p className="text-muted-foreground">
            With over [X] years of experience in the industry, I've worked on a variety of projects ranging from small business websites to complex web applications. I specialize in modern frontend technologies like React, Next.js, and Tailwind CSS, as well as backend technologies like Node.js and database solutions like Supabase.
          </p>
          <p className="text-muted-foreground">
            When I'm not coding, you can find me [your hobbies/interests]. I believe in continuous learning and staying up-to-date with the latest technologies and best practices in web development.
          </p>
          
          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center text-primary hover:underline"
            >
              Get in Touch
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">My Journey</h2>
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="md:col-span-3 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6 pb-6">
                <h4 className="text-lg font-medium">Bachelor's Degree in Computer Science</h4>
                <p className="text-muted-foreground">University Name, 2015-2019</p>
                <p className="mt-2">Focused on web development, software engineering, and user experience design.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="text-lg font-medium">Web Development Bootcamp</h4>
                <p className="text-muted-foreground">Bootcamp Name, 2020</p>
                <p className="mt-2">Intensive training in modern web technologies and frameworks.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold">Experience</h3>
            </div>
            <div className="md:col-span-3 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6 pb-6">
                <h4 className="text-lg font-medium">Senior Frontend Developer</h4>
                <p className="text-muted-foreground">Company Name, 2022-Present</p>
                <p className="mt-2">Leading the frontend development team, implementing modern web applications using React and Next.js.</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="text-lg font-medium">Web Developer</h4>
                <p className="text-muted-foreground">Company Name, 2019-2022</p>
                <p className="mt-2">Developed and maintained websites and web applications for various clients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-lg border border-border/40">
            <h3 className="text-xl font-semibold mb-4">Frontend</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                React & Next.js
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                TypeScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Framer Motion
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Responsive Design
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border/40">
            <h3 className="text-xl font-semibold mb-4">Backend</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Node.js
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Supabase
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                PostgreSQL
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                RESTful APIs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Authentication
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border/40">
            <h3 className="text-xl font-semibold mb-4">Tools & Others</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Git & GitHub
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                VS Code
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Figma
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                CI/CD
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Agile Methodology
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 