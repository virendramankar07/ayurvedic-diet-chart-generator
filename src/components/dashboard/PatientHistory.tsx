import { useState } from "react";
import { History, TrendingUp, Calendar, FileText, Plus, User, Activity, Scale, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { initialPatients } from "@/data/patients";
import { 
  DietChartHistory, 
  ProgressEntry, 
  sampleDietChartHistory, 
  sampleProgressEntries,
  generateHistoryId 
} from "@/data/patientHistory";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from "recharts";

const PatientHistory = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [dietHistory, setDietHistory] = useState<DietChartHistory[]>(sampleDietChartHistory);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>(sampleProgressEntries);
  const [isAddProgressOpen, setIsAddProgressOpen] = useState(false);
  const { toast } = useToast();

  const [progressForm, setProgressForm] = useState({
    weight: "",
    notes: "",
    symptoms: "",
    followUpRequired: false,
  });

  const patient = initialPatients.find(p => p.id === selectedPatient);
  const patientDietHistory = dietHistory.filter(h => h.patientId === selectedPatient);
  const patientProgress = progressEntries.filter(p => p.patientId === selectedPatient);

  // Chart data for weight tracking
  const weightChartData = patientProgress.map(p => ({
    date: p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: p.weight,
  }));

  // Chart data for calorie tracking
  const calorieChartData = patientDietHistory.map(h => ({
    date: h.generatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    calories: h.calories,
    disease: h.disease,
  }));

  // Chart data for macronutrients
  const macroChartData = patientDietHistory.map(h => ({
    date: h.generatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    proteins: h.proteinsG,
    carbs: h.carbsG,
    fats: h.fatsG,
  }));

  const handleAddProgress = () => {
    if (!selectedPatient || !progressForm.weight) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in required fields.",
      });
      return;
    }

    const newEntry: ProgressEntry = {
      id: generateHistoryId(),
      patientId: selectedPatient,
      date: new Date(),
      weight: parseFloat(progressForm.weight),
      notes: progressForm.notes,
      symptoms: progressForm.symptoms,
      followUpRequired: progressForm.followUpRequired,
    };

    setProgressEntries([...progressEntries, newEntry]);
    setProgressForm({ weight: "", notes: "", symptoms: "", followUpRequired: false });
    setIsAddProgressOpen(false);
    toast({
      title: "Progress Added",
      description: "Patient progress has been recorded successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Patient History</h2>
          <p className="text-muted-foreground">Track diet chart changes and patient progress over time</p>
        </div>
      </div>

      {/* Patient Selector */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Select Patient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose a patient to view history" />
                </SelectTrigger>
                <SelectContent>
                  {initialPatients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-muted-foreground">• {p.age} yrs • {p.disease}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedPatient && (
              <Dialog open={isAddProgressOpen} onOpenChange={setIsAddProgressOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Progress Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">Add Progress Entry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Current Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={progressForm.weight}
                        onChange={(e) => setProgressForm({ ...progressForm, weight: e.target.value })}
                        placeholder="Enter weight"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Current Symptoms</Label>
                      <Input
                        id="symptoms"
                        value={progressForm.symptoms}
                        onChange={(e) => setProgressForm({ ...progressForm, symptoms: e.target.value })}
                        placeholder="Describe current symptoms"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={progressForm.notes}
                        onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
                        placeholder="Additional observations"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="followUp"
                        checked={progressForm.followUpRequired}
                        onCheckedChange={(checked) => 
                          setProgressForm({ ...progressForm, followUpRequired: checked as boolean })
                        }
                      />
                      <Label htmlFor="followUp" className="cursor-pointer">Follow-up Required</Label>
                    </div>
                    <Button variant="default" className="w-full" onClick={handleAddProgress}>
                      Save Progress Entry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedPatient && patient && (
        <>
          {/* Patient Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{patientDietHistory.length}</p>
                    <p className="text-sm text-muted-foreground">Diet Charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{patientProgress.length}</p>
                    <p className="text-sm text-muted-foreground">Progress Entries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-leaf-light rounded-lg flex items-center justify-center">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{patient.weight} kg</p>
                    <p className="text-sm text-muted-foreground">Current Weight</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground truncate max-w-[100px]" title={patient.disease}>
                      {patient.disease || 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">Condition</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts & History Tabs */}
          <Tabs defaultValue="charts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="charts" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="diet-history" className="gap-2">
                <FileText className="h-4 w-4" />
                Diet History
              </TabsTrigger>
              <TabsTrigger value="progress" className="gap-2">
                <History className="h-4 w-4" />
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="charts" className="space-y-6">
              {/* Weight Tracking Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Weight Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weightChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightChartData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="weight"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary) / 0.2)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No weight data available. Add progress entries to see the chart.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Calorie Tracking Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Calorie Recommendations Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {calorieChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={calorieChartData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="calories"
                            stroke="hsl(var(--accent))"
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--accent))' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No calorie data available. Generate diet charts to see the trend.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Macronutrients Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Macronutrients Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {macroChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={macroChartData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                          <Legend />
                          <Bar dataKey="proteins" fill="hsl(var(--primary))" name="Proteins (g)" />
                          <Bar dataKey="carbs" fill="hsl(var(--accent))" name="Carbs (g)" />
                          <Bar dataKey="fats" fill="hsl(var(--muted-foreground))" name="Fats (g)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No macronutrient data available.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diet-history" className="space-y-4">
              {patientDietHistory.length > 0 ? (
                patientDietHistory.map((history) => (
                  <Card key={history.id} className="shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-leaf-light rounded-xl flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{history.disease}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {history.generatedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                            {history.calories} cal
                          </Badge>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {history.proteinsG}g protein
                          </Badge>
                          <Badge variant="outline">
                            {history.carbsG}g carbs
                          </Badge>
                          <Badge variant="outline">
                            {history.fatsG}g fats
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="shadow-card">
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No diet chart history found for this patient.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              {patientProgress.length > 0 ? (
                patientProgress.map((entry) => (
                  <Card key={entry.id} className="shadow-card">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                              <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {entry.date.toLocaleDateString()}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Weight: {entry.weight} kg
                              </p>
                            </div>
                          </div>
                          {entry.followUpRequired && (
                            <Badge variant="destructive">Follow-up Required</Badge>
                          )}
                        </div>
                        {entry.symptoms && (
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm font-medium text-foreground mb-1">Symptoms:</p>
                            <p className="text-sm text-muted-foreground">{entry.symptoms}</p>
                          </div>
                        )}
                        {entry.notes && (
                          <div className="bg-leaf-light rounded-lg p-3">
                            <p className="text-sm font-medium text-foreground mb-1">Notes:</p>
                            <p className="text-sm text-muted-foreground">{entry.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="shadow-card">
                  <CardContent className="py-12 text-center">
                    <History className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No progress entries found for this patient.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}

      {!selectedPatient && (
        <Card className="shadow-card">
          <CardContent className="py-16 text-center">
            <User className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl text-muted-foreground mb-2">Select a Patient</h3>
            <p className="text-muted-foreground/70">Choose a patient from the dropdown above to view their history and progress</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientHistory;
