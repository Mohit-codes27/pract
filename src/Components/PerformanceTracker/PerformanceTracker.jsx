import { CalendarDays, Target, TrendingUp, Clock, Mail, Phone, MapPin, GraduationCap, Star } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts"
import { getCurrentUser } from "./dummyData"

// Custom Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }) => <div className={`px-6 py-4 ${className}`}>{children}</div>

const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
)

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div className={`relative inline-block ${className}`}>
    {src ? (
      <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover rounded-full" />
    ) : (
      <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium">
        {fallback}
      </div>
    )}
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const PerformanceTracker = () => {
  const userData = getCurrentUser()
  const { personalInfo, academicInfo, internshipDetails, skills, tasks, performanceMetrics, attendance } = userData

  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const conversionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const today = new Date()
  const startDate = new Date(internshipDetails.startDate)
  const endDate = new Date(internshipDetails.endDate)
  const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
  const daysCompleted = totalDays - daysLeft
  const timeProgress = (daysCompleted / totalDays) * 100

  // Data for pie chart
  const taskStatusData = [
    { name: "Completed", value: completedTasks, color: "#22c55e" },
    { name: "In Progress", value: inProgressTasks, color: "#f59e0b" },
    { name: "Pending", value: pendingTasks, color: "#ef4444" },
  ].filter((item) => item.value > 0)

  // Weekly progress data
  const weeklyData = userData.weeklyReports.map((report) => ({
    week: `Week ${report.week}`,
    completed: report.tasksCompleted,
    hours: report.hoursWorked,
    productivity: report.productivity,
  }))

  // Skills radar chart data
  const topSkills = skills.slice(0, 6).map((skill) => ({
    skill: skill.name,
    level: skill.level,
  }))

  // Performance metrics data
  const performanceData = [
    { metric: "Technical", score: performanceMetrics.technicalSkills * 20 },
    { metric: "Communication", score: performanceMetrics.communication * 20 },
    { metric: "Teamwork", score: performanceMetrics.teamwork * 20 },
    { metric: "Problem Solving", score: performanceMetrics.problemSolving * 20 },
    { metric: "Time Management", score: performanceMetrics.timeManagement * 20 },
    { metric: "Initiative", score: performanceMetrics.initiative * 20 },
  ]

  const getStatusBadge = (rate) => {
    if (rate >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (rate >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section with User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar
              src={personalInfo.profileImage}
              alt={fullName}
              fallback={`${personalInfo.firstName[0]}${personalInfo.lastName[0]}`}
              className="h-20 w-20"
            />

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-semibold">{performanceMetrics.overallRating}/5.0</span>
                </div>
              </div>

              <p className="text-xl text-blue-600 font-medium">{internshipDetails.title}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm">{academicInfo.university}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{personalInfo.address.city}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedTasks}/{totalTasks}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarDays className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold text-gray-900">{internshipDetails.duration} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Days Remaining</p>
                <p className="text-2xl font-bold text-gray-900">{daysLeft}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Conversion Rate Card */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="p-2 bg-indigo-100 rounded-lg mx-auto w-fit">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Conversion Chances</p>
                <p className="text-2xl font-bold text-indigo-600">{conversionRate.toFixed(1)}%</p>
                <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      conversionRate >= 80 ? "bg-green-500" : conversionRate >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${conversionRate}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {completedTasks} of {totalTasks} completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Task Performance Overview</CardTitle>
              {getStatusBadge(conversionRate)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{inProgressTasks}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Task Completion</span>
                  <span>{conversionRate.toFixed(1)}%</span>
                </div>
                <Progress value={conversionRate} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Time Progress</span>
                  <span>{timeProgress.toFixed(1)}%</span>
                </div>
                <Progress value={timeProgress} className="h-3" />
              </div>

              {/* New Conversion Rate Bar */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Conversion Rate</h4>
                      <p className="text-sm text-gray-600">Tasks Completed / Tasks Assigned</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{conversionRate.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">
                        {completedTasks} of {totalTasks}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 relative overflow-hidden ${
                          conversionRate >= 80
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : conversionRate >= 60
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                        style={{ width: `${conversionRate}%` }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Progress markers */}
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          conversionRate >= 80 ? "bg-green-500" : conversionRate >= 60 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm font-medium">
                        {conversionRate >= 80
                          ? "Excellent Performance"
                          : conversionRate >= 60
                            ? "Good Progress"
                            : "Needs Improvement"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{totalTasks - completedTasks} tasks remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {taskStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={topSkills}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Skill Level" dataKey="level" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="metric" type="category" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PerformanceTracker
