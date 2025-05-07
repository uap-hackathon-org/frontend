import { v4 as uuidv4 } from 'uuid';

// Mock data for the application based on the database schema comments above

// Mock Companies
export const companies = [
  {
    id: 1,
    company_name: "TechCorp Inc.",
    description: "A leading technology company specializing in web development, cloud solutions, and AI technologies. We're looking for innovative students to join our team!",
    website: "https://techcorp-example.com",
    logo: "/companies/techcorp.png",
    company_size: "large",
    founded_year: 2005,
    verification_status: true,
    industries: ["Software Development", "Artificial Intelligence", "Cloud Computing"],
    location: "San Francisco, CA",
    hiring_for: ["Frontend Developer", "Machine Learning Engineer", "DevOps Specialist"],
    match_score: 92
  },
  {
    id: 2,
    company_name: "Innovate Solutions",
    description: "We create cutting-edge UX designs and frontend solutions for businesses of all sizes. Our mission is to make technology beautiful and accessible.",
    website: "https://innovate-example.com",
    logo: "/companies/innovate.png",
    company_size: "medium",
    founded_year: 2012,
    verification_status: true,
    industries: ["UX Design", "Frontend Engineering", "Digital Marketing"],
    location: "Austin, TX",
    hiring_for: ["UI/UX Designer", "Frontend Engineer", "Product Manager"],
    match_score: 85
  },
  {
    id: 3,
    company_name: "DataLeap",
    description: "Specializing in data analytics and business intelligence solutions. We help companies make sense of their data and derive actionable insights.",
    website: "https://dataleap-example.com",
    logo: "/companies/dataleap.png",
    company_size: "small",
    founded_year: 2018,
    verification_status: true,
    industries: ["Data Science", "Business Intelligence", "Analytics"],
    location: "Chicago, IL",
    hiring_for: ["Data Scientist", "Data Engineer", "Business Analyst"],
    match_score: 78
  },
  {
    id: 4,
    company_name: "CyberShield",
    description: "Providing top-tier cybersecurity solutions to protect businesses from evolving threats. We're passionate about building a safer digital world.",
    website: "https://cybershield-example.com",
    logo: "/companies/cybershield.png",
    company_size: "medium",
    founded_year: 2010,
    verification_status: true,
    industries: ["Cybersecurity", "Network Security", "Cloud Security"],
    location: "Boston, MA",
    hiring_for: ["Security Analyst", "Penetration Tester", "Security Engineer"],
    match_score: 65
  },
  {
    id: 5,
    company_name: "EduTech Innovations",
    description: "Creating the future of education technology. Our platforms help students learn more effectively and teachers teach more efficiently.",
    website: "https://edutech-example.com",
    logo: "/companies/edutech.png",
    company_size: "small",
    founded_year: 2015,
    verification_status: true,
    industries: ["Education Technology", "E-Learning", "Mobile Apps"],
    location: "Seattle, WA",
    hiring_for: ["Mobile Developer", "Educational Content Creator", "Product Designer"],
    match_score: 88
  },
  {
    id: 6,
    company_name: "HealthTech Solutions",
    description: "Developing innovative healthcare technologies to improve patient outcomes and streamline clinical workflows.",
    website: "https://healthtech-example.com",
    logo: "/companies/healthtech.png",
    company_size: "medium",
    founded_year: 2014,
    verification_status: true,
    industries: ["Healthcare Technology", "Telemedicine", "Medical Software"],
    location: "Minneapolis, MN",
    hiring_for: ["Backend Developer", "Healthcare Data Analyst", "UX Researcher"],
    match_score: 72
  }
];

// Mock Events (Workshops & Hackathons)
export const events = [
  {
    id: 1,
    title: "Frontend Development Workshop",
    description: "Learn modern frontend development techniques with React, Tailwind CSS, and Next.js. This hands-on workshop will cover component design, state management, and responsive layouts.",
    event_type: "workshop",
    organized_by_id: 1,
    organized_by_name: "TechCorp Inc.",
    start_date: "2025-05-12T10:00:00",
    end_date: "2025-05-12T12:00:00",
    registration_deadline: "2025-05-10T23:59:59",
    location: "Online",
    meeting_link: "https://meet.example.com/workshop-frontend",
    max_participants: 50,
    is_active: true,
    cover_image: "/events/frontend-workshop.jpg",
    tags: ["React", "Tailwind CSS", "Frontend"],
    prerequisites: ["Basic HTML/CSS knowledge", "JavaScript fundamentals"],
    materials: [
      { title: "Workshop Slides", description: "Presentation slides for the workshop" },
      { title: "Starter Code", description: "GitHub repository with starter code" }
    ]
  },
  {
    id: 2,
    title: "API Development with FastAPI",
    description: "Master the art of building high-performance APIs with FastAPI. This workshop covers API design, authentication, documentation, and testing.",
    event_type: "workshop",
    organized_by_id: 3,
    organized_by_name: "DataLeap",
    start_date: "2025-05-15T14:00:00",
    end_date: "2025-05-15T16:00:00",
    registration_deadline: "2025-05-13T23:59:59",
    location: "Online",
    meeting_link: "https://meet.example.com/workshop-api",
    max_participants: 40,
    is_active: true,
    cover_image: "/events/api-workshop.jpg",
    tags: ["FastAPI", "Python", "Backend"],
    prerequisites: ["Basic Python knowledge", "Understanding of HTTP protocols"],
    materials: [
      { title: "Workshop Guide", description: "Step-by-step guide for building APIs" },
      { title: "Code Examples", description: "Sample API implementations" }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Explore fundamental design principles that create intuitive user experiences. Learn about user research, wireframing, prototyping, and usability testing.",
    event_type: "workshop",
    organized_by_id: 2,
    organized_by_name: "Innovate Solutions",
    start_date: "2025-05-18T09:00:00",
    end_date: "2025-05-18T12:00:00",
    registration_deadline: "2025-05-16T23:59:59",
    location: "Innovate HQ, Austin TX",
    meeting_link: null,
    max_participants: 30,
    is_active: true,
    cover_image: "/events/ux-workshop.jpg",
    tags: ["UI/UX", "Design", "Figma"],
    prerequisites: ["No prior experience required"],
    materials: [
      { title: "Design Resources", description: "UI kits and design resources" },
      { title: "Case Studies", description: "Example UX projects with analysis" }
    ]
  },
  {
    id: 4,
    title: "AI for Education Hackathon",
    description: "A 3-day hackathon focused on developing AI solutions for educational challenges. Teams will compete to create innovative applications that enhance learning experiences.",
    event_type: "hackathon",
    organized_by_id: 5,
    organized_by_name: "EduTech Innovations",
    start_date: "2025-05-20T09:00:00",
    end_date: "2025-05-22T18:00:00",
    registration_deadline: "2025-05-15T23:59:59",
    location: "Online",
    meeting_link: "https://meet.example.com/hackathon-ai-edu",
    max_participants: 120,
    max_team_size: 5,
    is_active: true,
    cover_image: "/events/ai-hackathon.jpg",
    prizes: JSON.stringify({
      first: "$5,000 and mentorship opportunity",
      second: "$2,500",
      third: "$1,000",
      honorable: "$500 Amazon gift cards"
    }),
    tags: ["AI", "Machine Learning", "Education"],
    prerequisites: ["Basic programming knowledge", "Interest in AI and education"]
  },
  {
    id: 5,
    title: "Healthcare Innovation Hackathon",
    description: "Develop solutions to address pressing healthcare challenges. This hackathon brings together developers, designers, and healthcare professionals.",
    event_type: "hackathon",
    organized_by_id: 6,
    organized_by_name: "HealthTech Solutions",
    start_date: "2025-06-05T09:00:00",
    end_date: "2025-06-07T18:00:00",
    registration_deadline: "2025-05-25T23:59:59",
    location: "HealthTech Campus, Minneapolis MN",
    meeting_link: null,
    max_participants: 100,
    max_team_size: 4,
    is_active: true,
    cover_image: "/events/health-hackathon.jpg",
    prizes: JSON.stringify({
      first: "$7,500 and pilot program opportunity",
      second: "$3,500",
      third: "$1,500",
      honorable: "$750 in HealthTech credits"
    }),
    tags: ["Healthcare", "MedTech", "Innovation"],
    prerequisites: ["Interest in healthcare technology", "Problem-solving skills"]
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    description: "Learn the basics of cybersecurity including threat models, common vulnerabilities, and security best practices for developers.",
    event_type: "workshop",
    organized_by_id: 4,
    organized_by_name: "CyberShield",
    start_date: "2025-05-25T13:00:00",
    end_date: "2025-05-25T16:00:00",
    registration_deadline: "2025-05-22T23:59:59",
    location: "Online",
    meeting_link: "https://meet.example.com/workshop-security",
    max_participants: 45,
    is_active: true,
    cover_image: "/events/security-workshop.jpg",
    tags: ["Cybersecurity", "Web Security", "DevSecOps"],
    prerequisites: ["Basic web development knowledge"],
    materials: [
      { title: "Security Cheatsheet", description: "Quick reference for common security issues" },
      { title: "Practice Environment", description: "Virtual lab for security exercises" }
    ]
  }
];

// Mock Micro-Tasks
export const microTasks = [
  {
    id: 1,
    title: "Build a Responsive Dashboard",
    description: "Create a responsive admin dashboard using React and Tailwind CSS that displays user analytics, recent activities, and system notifications. The dashboard should adapt to different screen sizes and include dark/light mode toggling.",
    difficulty: "intermediate",
    points: 75,
    created_by_id: 1,
    created_by_name: "TechCorp Inc.",
    creation_date: "2025-04-15T10:30:00",
    deadline: "2025-05-10T23:59:59",
    is_active: true,
    max_submissions: 30,
    completed_count: 12,
    category: "frontend",
    required_skills: ["React", "Tailwind CSS", "Responsive Design"],
    attachments: [
      { title: "Design Mockup", description: "Figma design for the dashboard" },
      { title: "Requirements Doc", description: "Detailed requirements and acceptance criteria" }
    ],
    estimated_hours: 10,
    company_logo: "/companies/techcorp.png"
  },
  {
    id: 2,
    title: "API Integration Challenge",
    description: "Implement a REST API integration with authentication using JWT tokens. The task includes fetching data from a provided API, implementing user authentication, and displaying the protected data in a clean interface.",
    difficulty: "intermediate",
    points: 65,
    created_by_id: 3,
    created_by_name: "DataLeap",
    creation_date: "2025-04-20T14:15:00",
    deadline: "2025-05-15T23:59:59",
    is_active: true,
    max_submissions: 25,
    completed_count: 8,
    category: "backend",
    required_skills: ["API Integration", "Authentication", "JavaScript/TypeScript"],
    attachments: [
      { title: "API Documentation", description: "Swagger documentation for the API" },
      { title: "Starter Repository", description: "GitHub repo with initial setup" }
    ],
    estimated_hours: 8,
    company_logo: "/companies/dataleap.png"
  },
  {
    id: 3,
    title: "Design a Mobile App Onboarding Flow",
    description: "Create an engaging onboarding experience for a mobile app that introduces key features and collects necessary user information. The design should be visually appealing and optimize for user conversion.",
    difficulty: "beginner",
    points: 50,
    created_by_id: 2,
    created_by_name: "Innovate Solutions",
    creation_date: "2025-04-22T09:45:00",
    deadline: "2025-05-20T23:59:59",
    is_active: true,
    max_submissions: 40,
    completed_count: 15,
    category: "design",
    required_skills: ["UI/UX Design", "Figma", "Mobile Design"],
    attachments: [
      { title: "App Brand Guidelines", description: "Colors, typography, and brand assets" },
      { title: "User Personas", description: "Target audience profiles" }
    ],
    estimated_hours: 6,
    company_logo: "/companies/innovate.png"
  },
  {
    id: 4,
    title: "Database Schema Optimization",
    description: "Analyze and optimize a provided database schema for an e-commerce application. Identify performance bottlenecks, improve table relationships, and implement indexing strategies.",
    difficulty: "advanced",
    points: 90,
    created_by_id: 3,
    created_by_name: "DataLeap",
    creation_date: "2025-04-25T11:20:00",
    deadline: "2025-05-25T23:59:59",
    is_active: true,
    max_submissions: 20,
    completed_count: 5,
    category: "database",
    required_skills: ["SQL", "Database Design", "Performance Optimization"],
    attachments: [
      { title: "Current Schema", description: "Existing database schema documentation" },
      { title: "Performance Requirements", description: "Target metrics and requirements" }
    ],
    estimated_hours: 12,
    company_logo: "/companies/dataleap.png"
  },
  {
    id: 5,
    title: "Implement Security Best Practices",
    description: "Review a web application for security vulnerabilities and implement fixes according to OWASP guidelines. Focus areas include XSS prevention, CSRF protection, and secure authentication practices.",
    difficulty: "advanced",
    points: 85,
    created_by_id: 4,
    created_by_name: "CyberShield",
    creation_date: "2025-04-28T15:30:00",
    deadline: "2025-05-28T23:59:59",
    is_active: true,
    max_submissions: 15,
    completed_count: 3,
    category: "security",
    required_skills: ["Web Security", "OWASP", "Penetration Testing"],
    attachments: [
      { title: "Application Codebase", description: "Access to the application repository" },
      { title: "Security Checklist", description: "OWASP Top 10 checklist" }
    ],
    estimated_hours: 10,
    company_logo: "/companies/cybershield.png"
  },
  {
    id: 6,
    title: "Create an Educational Interactive Quiz",
    description: "Develop an interactive quiz application for educational purposes using React. The quiz should include different question types, immediate feedback, and a final score summary.",
    difficulty: "beginner",
    points: 45,
    created_by_id: 5,
    created_by_name: "EduTech Innovations",
    creation_date: "2025-04-30T13:15:00",
    deadline: "2025-05-30T23:59:59",
    is_active: true,
    max_submissions: 50,
    completed_count: 22,
    category: "frontend",
    required_skills: ["React", "JavaScript", "Educational Design"],
    attachments: [
      { title: "Quiz Content", description: "Question and answer content for implementation" },
      { title: "UI Wireframes", description: "Basic wireframes for the quiz interface" }
    ],
    estimated_hours: 5,
    company_logo: "/companies/edutech.png"
  },
  {
    id: 7,
    title: "Develop a Telemedicine Feature",
    description: "Implement a video consultation feature for a healthcare application. The feature should include appointment scheduling, video calling, and session notes functionality.",
    difficulty: "expert",
    points: 100,
    created_by_id: 6,
    created_by_name: "HealthTech Solutions",
    creation_date: "2025-05-02T10:45:00",
    deadline: "2025-06-02T23:59:59",
    is_active: true,
    max_submissions: 10,
    completed_count: 1,
    category: "fullstack",
    required_skills: ["WebRTC", "React", "Node.js", "Healthcare Integration"],
    attachments: [
      { title: "Feature Specification", description: "Detailed requirements document" },
      { title: "API Documentation", description: "Documentation for healthcare APIs" }
    ],
    estimated_hours: 15,
    company_logo: "/companies/healthtech.png"
  },
  {
    id: 8,
    title: "Implement AI-Powered Content Recommendations",
    description: "Create a recommendation engine for educational content using machine learning techniques. The system should analyze user behavior and suggest relevant learning materials.",
    difficulty: "expert",
    points: 95,
    created_by_id: 5,
    created_by_name: "EduTech Innovations",
    creation_date: "2025-05-05T09:30:00",
    deadline: "2025-06-05T23:59:59",
    is_active: true,
    max_submissions: 12,
    completed_count: 0,
    category: "machine-learning",
    required_skills: ["Python", "Machine Learning", "Data Analysis"],
    attachments: [
      { title: "Sample Dataset", description: "Anonymized user behavior data" },
      { title: "Evaluation Metrics", description: "Metrics for assessing recommendation quality" }
    ],
    estimated_hours: 14,
    company_logo: "/companies/edutech.png"
  }
];

// Skill categories for filtering and display
export const skillCategories = [
  { id: 1, name: "Frontend", skills: ["React", "Vue.js", "Angular", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "Responsive Design"] },
  { id: 2, name: "Backend", skills: ["Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Go", "REST APIs", "GraphQL"] },
  { id: 3, name: "Database", skills: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "Database Design"] },
  { id: 4, name: "DevOps", skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Linux"] },
  { id: 5, name: "Design", skills: ["UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Motion Design"] },
  { id: 6, name: "Mobile", skills: ["React Native", "Flutter", "Swift", "Kotlin", "Mobile Design"] },
  { id: 7, name: "Data Science", skills: ["Machine Learning", "Data Analysis", "Python", "R", "TensorFlow", "PyTorch", "NLP"] },
  { id: 8, name: "Security", skills: ["Web Security", "Penetration Testing", "OWASP", "Security Auditing", "Encryption"] }
];

// Difficulty levels for filtering
export const difficultyLevels = [
  { id: "beginner", name: "Beginner", description: "Tasks suitable for those new to the field" },
  { id: "intermediate", name: "Intermediate", description: "Tasks requiring some prior experience" },
  { id: "advanced", name: "Advanced", description: "Tasks for experienced individuals" },
  { id: "expert", name: "Expert", description: "Tasks requiring deep expertise in the domain" }
];


// # Association tables for many-to-many relationships
// student_task = Table(
//     'student_task', Base.metadata,
//     Column('student_id', Integer, ForeignKey('students.id')),
//     Column('task_id', Integer, ForeignKey('micro_tasks.id')),
//     Column('completion_date', DateTime, default=datetime.datetime.utcnow),
//     Column('score', Float, default=0),
//     Column('feedback', Text, nullable=True)
// )

// task_skill = Table(
//     'task_skill', Base.metadata,
//     Column('task_id', Integer, ForeignKey('micro_tasks.id')),
//     Column('skill_id', Integer, ForeignKey('skills.id'))
// )

// student_event = Table(
//     'student_event', Base.metadata,
//     Column('student_id', Integer, ForeignKey('students.id')),
//     Column('event_id', Integer, ForeignKey('events.id')),
//     Column('registration_date', DateTime, default=datetime.datetime.utcnow),
//     Column('attendance', Boolean, default=False),
//     Column('team_name', String, nullable=True),
//     Column('position', Integer, nullable=True)  # Ranking in hackathon events
// )

// class DifficultyEnum(enum.Enum):
//     BEGINNER = "beginner"
//     INTERMEDIATE = "intermediate"
//     ADVANCED = "advanced"
//     EXPERT = "expert"

// class MicroTask(Base):
//     tablename = 'micro_tasks'
//     id = Column(Integer, primary_key=True, index=True)
//     title = Column(String, nullable=False)
//     description = Column(Text, nullable=False)
//     difficulty = Column(Enum(DifficultyEnum), nullable=False)
//     points = Column(Integer, default=10)  # Points awarded for completion
//     created_by_id = Column(Integer, ForeignKey('companies.id'))
//     created_by = relationship("Company", back_populates="created_tasks")
//     creation_date = Column(DateTime, default=datetime.datetime.utcnow)
//     deadline = Column(DateTime, nullable=True)
//     is_active = Column(Boolean, default=True)
//     max_submissions = Column(Integer, default=1)  # How many students can complete this task
//     completed_by = relationship("Student", secondary=student_task, back_populates="completed_tasks")
//     required_skills = relationship("Skill", secondary=task_skill, back_populates="required_for_tasks")
//     attachments = relationship("TaskAttachment", back_populates="task")
//     recommendations = relationship("AIRecommendation", back_populates="task")
//     category = Column(String, nullable=True)  # Category of the task (e.g., frontend, backend, UI/UX)

// class TaskAttachment(Base):
//     tablename = 'task_attachments'
//     id = Column(Integer, primary_key=True, index=True)
//     task_id = Column(Integer, ForeignKey('micro_tasks.id'))
//     task = relationship("MicroTask", back_populates="attachments")
//     file_id = Column(Integer, ForeignKey('local_files.id'))
//     file = relationship("LocalFile")
//     description = Column(Text, nullable=True)

// class EventType(enum.Enum):
//     WORKSHOP = "workshop"
//     HACKATHON = "hackathon"
//     WEBINAR = "webinar"
//     CAREER_FAIR = "career_fair"
//     BOOTCAMP = "bootcamp"

// > Mahmud:
// class Event(Base):
//     tablename = 'events'
//     id = Column(Integer, primary_key=True, index=True)
//     title = Column(String, nullable=False)
//     description = Column(Text, nullable=False)
//     event_type = Column(Enum(EventType), nullable=False)
//     organized_by_id = Column(Integer, ForeignKey('companies.id'))
//     organized_by = relationship("Company", back_populates="created_events")
//     start_date = Column(DateTime, nullable=False)
//     end_date = Column(DateTime, nullable=False)
//     registration_deadline = Column(DateTime, nullable=False)
//     location = Column(String, nullable=True)  # Physical location or "Online"
//     longitude = Column(String, nullable=True)
//     latitude = Column(String, nullable=True)
//     meeting_link = Column(String, nullable=True)  # For online events
//     max_participants = Column(Integer, nullable=True)
//     max_team_size = Column(Integer, nullable=True)  # For hackathons
//     is_active = Column(Boolean, default=True)
//     cover_image_id = Column(Integer, ForeignKey('local_files.id'), nullable=True)
//     cover_image = relationship("LocalFile")
//     prizes = Column(Text, nullable=True)  # JSON string with prize details for hackathons
//     participants = relationship("Student", secondary=student_event, back_populates="events")
//     materials = relationship("EventMaterial", back_populates="event")

// class EventMaterial(Base):
//     tablename = 'event_materials'
//     id = Column(Integer, primary_key=True, index=True)
//     event_id = Column(Integer, ForeignKey('events.id'))
//     event = relationship("Event", back_populates="materials")
//     file_id = Column(Integer, ForeignKey('local_files.id'))
//     file = relationship("LocalFile")
//     title = Column(String, nullable=False)
//     description = Column(Text, nullable=True)
//     upload_date = Column(DateTime, default=datetime.datetime.utcnow)

// class AIRecommendation(Base):
//     tablename = 'ai_recommendations'
//     id = Column(Integer, primary_key=True, index=True)
//     # Student association
//     student_id = Column(Integer, ForeignKey('students.id'))
//     student = relationship("Student", back_populates="recommendations")
//     # Task association
//     task_id = Column(Integer, ForeignKey('micro_tasks.id'))
//     task = relationship("MicroTask", back_populates="recommendations")
//     # Recommendation details
//     title = Column(String, nullable=False)
//     content = Column(String, nullable=False)
//     created_at = Column(DateTime, default=datetime.datetime.utcnow)


// from db import Base
// from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text, DateTime, Boolean, Table
// from sqlalchemy.orm import relationship
// import datetime

// # Association tables for many-to-many relationships
// skill_student_association = Table(
//     'skill_student', Base.metadata,
//     Column('student_id', Integer, ForeignKey('students.id')),
//     Column('skill_id', Integer, ForeignKey('skills.id'))
// )

// company_industry_association = Table(
//     'company_industry', Base.metadata,
//     Column('company_id', Integer, ForeignKey('companies.id')),
//     Column('industry_id', Integer, ForeignKey('industries.id'))
// )

// > Mahmud:
// class User(Base):
//     tablename = 'users'
//     id = Column(Integer, primary_key=True, index=True)
//     email = Column(String, nullable=False, unique=True)
//     bio = Column(String, nullable=True)
//     password = Column(String, nullable=False)
//     name = Column(String, nullable=False)
//     profile_pic_id = Column(Integer, ForeignKey("local_files.id"), nullable=True)
//     profile_pic = relationship("LocalFile")
//     phone = Column(String, nullable=True)
//     place = Column(String, nullable=True)
//     latitude = Column(String, nullable=True)
//     longitude = Column(String, nullable=True)
//     role = Column(String, nullable=False)  # 'admin', 'student', 'company'
//     device_token = Column(String, nullable=True)
//     joined_date = Column(DateTime, default=datetime.datetime.utcnow)
//     notifications = relationship("Notification", back_populates="user", lazy="dynamic")
//     student = relationship("Student", back_populates="user", uselist=False)
//     company = relationship("Company", back_populates="user", uselist=False)

// class Student(Base):
//     tablename = 'students'
//     id = Column(Integer, primary_key=True, index=True)
//     user_id = Column(Integer, ForeignKey("users.id"))
//     user = relationship("User", back_populates="student")
//     university = Column(String, nullable=True)
//     graduation_year = Column(Integer, nullable=True)
//     major = Column(String, nullable=True)
//     resume_id = Column(Integer, ForeignKey("local_files.id"), nullable=True)
//     resume = relationship("LocalFile", foreign_keys=[resume_id])
//     total_points = Column(Integer, default=0)
//     skills = relationship("Skill", secondary=skill_student_association, back_populates="students")
//     completed_tasks = relationship("MicroTask", secondary="student_task", back_populates="completed_by")
//     events = relationship("Event", secondary="student_event", back_populates="participants")
//     recommendations = relationship("AIRecommendation", back_populates="student")

// class Company(Base):
//     tablename = 'companies'
//     id = Column(Integer, primary_key=True, index=True)
//     user_id = Column(Integer, ForeignKey("users.id"))
//     user = relationship("User", back_populates="company")
//     company_name = Column(String, nullable=False)
//     description = Column(Text, nullable=True)
//     website = Column(String, nullable=True)
//     logo_id = Column(Integer, ForeignKey("local_files.id"), nullable=True)
//     logo = relationship("LocalFile", foreign_keys=[logo_id])
//     company_size = Column(String, nullable=True)  # small, medium, large
//     founded_year = Column(Integer, nullable=True)
//     verification_status = Column(Boolean, default=False)  # Is the company verified
//     industries = relationship("Industry", secondary=company_industry_association, back_populates="companies")
//     created_tasks = relationship("MicroTask", back_populates="created_by")
//     created_events = relationship("Event", back_populates="organized_by")

// class Skill(Base):
//     tablename = 'skills'
//     id = Column(Integer, primary_key=True, index=True)
//     name = Column(String, nullable=False, unique=True)
//     description = Column(Text, nullable=True)
//     category = Column(String, nullable=True)  # e.g., technical, soft skills, domain-specific
//     students = relationship("Student", secondary=skill_student_association, back_populates="skills")
//     required_for_tasks = relationship("MicroTask", secondary="task_skill", back_populates="required_skills")

// class Industry(Base):
//     tablename = 'industries'
//     id = Column(Integer, primary_key=True, index=True)
//     name = Column(String, nullable=False, unique=True)
//     description = Column(Text, nullable=True)
//     companies = relationship("Company", secondary=company_industry_association, back_populates="industries")
    

// from datetime import datetime
// from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, Boolean, Text
// from sqlalchemy.orm import relationship
// from db import Base

// > Mahmud:
// class Leaderboard(Base):
//     tablename = "leaderboards"
//     id = Column(Integer, primary_key=True, index=True)
//     name = Column(String, nullable=False)
//     description = Column(Text, nullable=True)
//     is_active = Column(Boolean, default=True)
//     created_at = Column(DateTime, default=datetime.now)
//     entries = relationship("LeaderboardEntry", back_populates="leaderboard")
    
//     # Leaderboards can be global, for specific skills, or for specific events
//     category = Column(String, nullable=True)  # 'global', 'skill', 'event'
//     related_id = Column(Integer, nullable=True)  # ID of related skill or event if applicable

// class LeaderboardEntry(Base):
//     tablename = "leaderboard_entries"
//     id = Column(Integer, primary_key=True, index=True)
//     leaderboard_id = Column(Integer, ForeignKey("leaderboards.id"))
//     student_id = Column(Integer, ForeignKey("students.id"))
//     score = Column(Float, default=0)
//     rank = Column(Integer, nullable=True)
//     last_updated = Column(DateTime, default=datetime.now, onupdate=datetime.now)

//     leaderboard = relationship("Leaderboard", back_populates="entries")
//     student = relationship("Student")

// class Achievement(Base):
//     tablename = "achievements"
//     id = Column(Integer, primary_key=True, index=True)
//     name = Column(String, nullable=False)
//     description = Column(Text, nullable=False)
//     icon_id = Column(Integer, ForeignKey("local_files.id"), nullable=True)
//     icon = relationship("LocalFile")
//     points = Column(Integer, default=0)
//     is_active = Column(Boolean, default=True)
    
//     requirements = Column(Text, nullable=False)
//     earners = relationship("StudentAchievement", back_populates="achievement")

// class StudentAchievement(Base):
//     tablename = "student_achievements"
//     id = Column(Integer, primary_key=True, index=True)
//     student_id = Column(Integer, ForeignKey("students.id"))
//     achievement_id = Column(Integer, ForeignKey("achievements.id"))
//     earned_at = Column(DateTime, default=datetime.now)
    
//     student = relationship("Student")
//     achievement = relationship("Achievement", back_populates="earners")


// Chat mock data
export const chatUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.png',
    status: 'online',
    role: 'Career Advisor',
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: 'Prof. David Lee',
    avatar: '/avatars/david.png',
    status: 'offline',
    role: 'Course Instructor',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    name: 'Tech Support',
    avatar: '/avatars/support.png',
    status: 'online',
    role: 'Support Team',
    lastSeen: new Date(),
  },
  {
    id: '4',
    name: 'Job Opportunities',
    avatar: '/avatars/jobs.png',
    status: 'online',
    role: 'Job Alerts',
    lastSeen: new Date(),
    isGroup: true,
    members: 12,
  },
  {
    id: '5',
    name: 'Web Development 101',
    avatar: '/avatars/webdev.png',
    status: 'online',
    role: 'Class Group',
    lastSeen: new Date(),
    isGroup: true,
    members: 24,
  },
];

export const chatMessages = {
  '1': [
    {
      id: uuidv4(),
      senderId: '1',
      content: 'Hello! How is your job search going? Have you applied to the positions we discussed last week?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'Hi Sarah! Yes, I submitted applications to three companies. One of them already invited me for an interview next week!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), // 15 minutes after previous message
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '1',
      content: "That's fantastic news! Do you need help preparing for the interview? We could schedule a mock interview session if you'd like.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30), // 1 day ago + 30 min
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'That would be really helpful. When are you available for a mock interview?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 35), // 5 min after previous message
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '1',
      content: 'I can do tomorrow at 3 PM or Friday at 10 AM. Which works better for you?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
  ],
  '2': [
    {
      id: uuidv4(),
      senderId: '2',
      content: 'Just a reminder that your final project is due next week. Please make sure to submit it on time.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'Professor, I had a question about the project requirements. Can I use external libraries or should I code everything from scratch?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 45), // 45 minutes after previous message
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '2',
      content: 'You can use external libraries, but make sure to document which ones you used and explain why. The focus should be on demonstrating your understanding of the core concepts.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: "Thank you, that clarifies things. I'll start working on it right away.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), // 10 minutes after previous message
      read: true,
    },
  ],
  '3': [
    {
      id: uuidv4(),
      senderId: '3',
      content: 'Hello, thanks for contacting tech support. How can we help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: "I'm having trouble accessing the course materials for Web Development 101. When I click on the link, it says 'Access Denied'.",
      timestamp: new Date(Date.now() - 1000 * 60 * 28), // 28 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '3',
      content: "I'll check that for you right away. Can you please confirm your student ID so I can verify your enrollment?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'My student ID is STU-2023-45678',
      timestamp: new Date(Date.now() - 1000 * 60 * 24), // 24 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '3',
      content: "Thanks for providing your ID. I've checked our system, and it looks like there was a temporary glitch. I've reset your access permissions. Could you please try accessing the materials again and let me know if it works?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      read: false,
    },
  ],
  '4': [
    {
      id: uuidv4(),
      senderId: '4',
      content: '[JOB ALERT] New position available: Junior Web Developer at TechSolutions Inc. Requirements: HTML, CSS, JavaScript, React. Apply by June 15.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '4',
      content: '[JOB ALERT] Virtual Career Fair happening next Wednesday. Companies hiring: Google, Microsoft, Amazon, and 15 more tech companies. Register now!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '4',
      content: '[JOB ALERT] New internship opportunity: Data Science Intern at AnalyticsPro. Perfect for students completing our Data Science 101 course. Limited spots available.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
    },
  ],
  '5': [
    {
      id: uuidv4(),
      senderId: '2', // Professor
      content: 'Welcome to Web Development 101! Use this group chat to discuss assignments, share resources, and ask questions.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'user-101',
      content: 'Does anyone have recommendations for good CSS frameworks to use for the final project?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      userName: 'Alex Chen',
    },
    {
      id: uuidv4(),
      senderId: 'user-102',
      content: 'I really like Tailwind CSS! The utility-first approach makes it super easy to customize components.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 30 minutes after previous message
      read: true,
      userName: 'Maya Patel',
    },
    {
      id: uuidv4(),
      senderId: 'user-103',
      content: 'Bootstrap is also a good option if you want something with pre-built components that are easy to use.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 45), // 15 minutes after previous message
      read: true,
      userName: 'Jordan Smith',
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: "Thanks for the suggestions! I'll take a look at both Tailwind and Bootstrap to see which one works better for my project.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '2', // Professor
      content: 'Just a reminder that we have a guest speaker tomorrow discussing real-world web development practices. Attendance is highly recommended!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
    },
  ],
};

export const currentUser = {
  id: 'currentUser',
  name: 'You',
  avatar: '/avatars/user.png',
  status: 'online',
};

// Function to get unread messages count
export function getUnreadCount(userId) {
  if (!chatMessages[userId]) return 0;
  return chatMessages[userId].filter(msg => !msg.read && msg.senderId !== 'currentUser').length;
}

// Function to get total unread messages count
export function getTotalUnreadCount() {
  return Object.keys(chatMessages).reduce((total, userId) => {
    return total + getUnreadCount(userId);
  }, 0);
}

// Function to get company by ID
export function getMockCompanyById(id) {
  // Convert id to number if it's a string
  const companyId = typeof id === 'string' ? parseInt(id, 10) : id;
  return companies.find(company => company.id === companyId) || null;
}

// Function to format timestamp
export function formatMessageTime(timestamp) {
  const now = new Date();
  const messageDate = new Date(timestamp);
  
  const isToday = messageDate.getDate() === now.getDate() &&
                 messageDate.getMonth() === now.getMonth() &&
                 messageDate.getFullYear() === now.getFullYear();
                 
  const isYesterday = messageDate.getDate() === now.getDate() - 1 &&
                     messageDate.getMonth() === now.getMonth() &&
                     messageDate.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

// Function to get all skills from skill categories
export function getMockSkills() {
  let skillsArray = [];
  let idCounter = 1;
  
  // Extract skills from categories and create individual skill objects
  skillCategories.forEach(category => {
    category.skills.forEach(skillName => {
      // Check if the skill is already in the array to avoid duplicates
      if (!skillsArray.some(skill => skill.name === skillName)) {
        skillsArray.push({
          id: idCounter++,
          name: skillName,
          category: category.name
        });
      }
    });
  });
  
  return skillsArray;
}

// Mock data for virtual sessions
export const virtualSessions = [
  {
    id: 1,
    title: "Career Planning & Resume Review",
    sessionType: "one-on-one",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    mentor: {
      id: 101,
      name: "Sarah Johnson",
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      avatar: "/avatars/sarah.png"
    },
    description: "Review your career goals and improve your resume to stand out in job applications.",
    status: "scheduled",
    meetingUrl: "/video-session/1"
  },
  {
    id: 2,
    title: "Web Development Best Practices",
    sessionType: "group",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    mentor: {
      id: 102,
      name: "David Lee",
      position: "Lead Front-end Developer",
      company: "Innovate Solutions",
      avatar: "/avatars/david.png"
    },
    participants: 12,
    description: "Learn about modern web development practices, tools, and techniques to improve your projects.",
    status: "scheduled",
    meetingUrl: "/video-session/2"
  },
  {
    id: 3,
    title: "Interview Preparation Workshop",
    sessionType: "group",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    mentor: {
      id: 103,
      name: "Michelle Zhang",
      position: "HR Manager",
      company: "TechCorp Inc.",
      avatar: "/avatars/michelle.png"
    },
    participants: 8,
    description: "Prepare for technical and behavioral interviews with mock questions and feedback.",
    status: "scheduled",
    meetingUrl: "/video-session/3"
  },
  {
    id: 4,
    title: "Database Optimization Strategies",
    sessionType: "one-on-one",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    mentor: {
      id: 104,
      name: "Robert Chen",
      position: "Database Architect",
      company: "DataLeap",
      avatar: "/avatars/robert.png"
    },
    description: "Discuss database optimization strategies for your current projects and career growth.",
    status: "completed",
    recording: "https://example.com/recording/4",
    feedback: {
      given: false
    }
  },
  {
    id: 5,
    title: "Mobile App Development Workshop",
    sessionType: "group",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    mentor: {
      id: 105,
      name: "Jessica Kim",
      position: "Mobile Development Specialist",
      company: "Innovate Solutions",
      avatar: "/avatars/jessica.png"
    },
    participants: 15,
    description: "Introduction to mobile app development with React Native and real-world examples.",
    status: "completed",
    recording: "https://example.com/recording/5",
    feedback: {
      given: true,
      rating: 5
    }
  }
];

// Function to get virtual sessions for a student
export function getMockVirtualSessions(userId) {
  // In a real app, this would filter sessions for the specific user
  // For demo purposes, we'll return all sessions
  return virtualSessions;
}

// Mock data for student submissions
export const studentSubmissions = [
  {
    id: 1,
    taskId: 3,
    taskTitle: "Build a Responsive Landing Page",
    student: {
      id: 201,
      name: "Anika Rahman",
      avatar: "/avatars/anika.png",
      university: "Bangladesh University of Engineering and Technology",
      major: "Computer Science",
      year: 3
    },
    submissionDate: "2025-05-01T14:30:00",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubLink: "https://github.com/anikarahman/responsive-landing-page",
    description: "I've implemented a fully responsive landing page using React and Tailwind CSS with animations and dark mode support. The page is optimized for all screen sizes and includes all the required features.",
    status: "pending",
    feedback: null,
    score: null
  },
  {
    id: 2,
    taskId: 5,
    taskTitle: "Develop a REST API with Node.js",
    student: {
      id: 202,
      name: "Samin Ahmed",
      avatar: "/avatars/samin.png",
      university: "Dhaka University",
      major: "Computer Science and Engineering",
      year: 4
    },
    submissionDate: "2025-04-28T09:15:00",
    youtubeLink: "https://www.youtube.com/watch?v=rYEDA3JcQqw",
    githubLink: "https://github.com/saminahmed/node-rest-api",
    description: "This is a fully functional REST API built with Node.js, Express, and MongoDB. It includes authentication, authorization, rate limiting, and comprehensive documentation using Swagger.",
    status: "reviewed",
    feedback: "Excellent work, Samin! Your API is well-structured and follows best practices. The documentation is clear and comprehensive. The authentication implementation is particularly impressive. I would suggest adding more test cases for edge scenarios.",
    score: 92
  },
  {
    id: 3,
    taskId: 7,
    taskTitle: "Implement a Machine Learning Model",
    student: {
      id: 203,
      name: "Tasneem Khan",
      avatar: "/avatars/tasneem.png",
      university: "North South University",
      major: "Data Science",
      year: 3
    },
    submissionDate: "2025-05-02T16:45:00",
    youtubeLink: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    githubLink: "https://github.com/tasneemkhan/ml-prediction-model",
    description: "I've implemented a machine learning model for predicting student performance based on various factors. The model uses a combination of random forest and gradient boosting techniques to achieve high accuracy.",
    status: "pending",
    feedback: null,
    score: null
  },
  {
    id: 4,
    taskId: 2,
    taskTitle: "Create a Mobile-First Dashboard",
    student: {
      id: 204,
      name: "Rafid Hasan",
      avatar: "/avatars/rafid.png",
      university: "Islamic University of Technology",
      major: "Software Engineering",
      year: 2
    },
    submissionDate: "2025-04-25T11:20:00",
    youtubeLink: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    githubLink: "https://github.com/rafidhasan/mobile-dashboard",
    description: "This dashboard is built with a mobile-first approach using React Native Web. It features responsive layouts, smooth animations, and real-time data updates with websockets.",
    status: "reviewed",
    feedback: "Good work on the responsive design, Rafid. The dashboard looks great on mobile devices. However, there are some performance issues when handling large datasets. Consider implementing virtualization for long lists. Also, the color contrast could be improved for better accessibility.",
    score: 78
  },
  {
    id: 5,
    taskId: 9,
    taskTitle: "Build a Real-Time Chat Application",
    student: {
      id: 205,
      name: "Nusrat Jahan",
      avatar: "/avatars/nusrat.png",
      university: "Bangladesh University of Professionals",
      major: "Computer Engineering",
      year: 4
    },
    submissionDate: "2025-05-03T13:10:00",
    youtubeLink: "https://www.youtube.com/watch?v=CwwsONbAgg0",
    githubLink: "https://github.com/nusratjahan/realtime-chat",
    description: "I've created a real-time chat application using Socket.io and React. The app features user authentication, message encryption, read receipts, and file sharing capabilities.",
    status: "pending",
    feedback: null,
    score: null
  },
  {
    id: 6,
    taskId: 11,
    taskTitle: "Develop an E-commerce API",
    student: {
      id: 206,
      name: "Zubair Islam",
      avatar: "/avatars/zubair.png",
      university: "Military Institute of Science and Technology",
      major: "Information Technology",
      year: 3
    },
    submissionDate: "2025-04-20T15:35:00",
    youtubeLink: "https://www.youtube.com/watch?v=pRpeEdMmmQ0",
    githubLink: "https://github.com/zubairislam/ecommerce-api",
    description: "This is a comprehensive e-commerce API built with Django REST Framework. It includes product management, user authentication, order processing, payment integration, and analytics.",
    status: "reviewed",
    feedback: "Your API is well-implemented, Zubair. The code is clean and well-organized. The documentation is thorough and the test coverage is excellent. However, there are some security concerns with the payment processing implementation. Consider using a more secure approach for handling sensitive payment information.",
    score: 85
  }
];

// Function to get student submissions for a company
export function getMockSubmissionsForCompany(companyId) {
  // In a real app, this would filter submissions by company ID
  // For demo purposes, we'll return all submissions
  return studentSubmissions;
}
