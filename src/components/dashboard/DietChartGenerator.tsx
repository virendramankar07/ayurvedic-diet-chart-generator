import { useState } from "react";
import { FileText, Download, Printer, User, Leaf, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { diseases, getDiseaseByName, type DiseaseData } from "@/data/diseases";
import { initialPatients, type Patient } from "@/data/patients";

interface GeneratedChart {
  patient: Patient;
  disease: DiseaseData;
  generatedAt: Date;
}

const DietChartGenerator = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedDisease, setSelectedDisease] = useState<string>("");
  const [generatedChart, setGeneratedChart] = useState<GeneratedChart | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!selectedPatient || !selectedDisease) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select both patient and disease to generate a diet chart.",
      });
      return;
    }

    const disease = getDiseaseByName(selectedDisease);
    const patient = initialPatients.find((p) => p.id === selectedPatient);

    if (disease && patient) {
      setGeneratedChart({
        patient,
        disease,
        generatedAt: new Date(),
      });
      toast({
        title: "Diet Chart Generated",
        description: `Diet chart for ${patient.name} has been generated successfully.`,
      });
    }
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Use your browser's print dialog to print or save as PDF.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Diet Chart Generator</h2>
        <p className="text-muted-foreground">Create personalized Ayurvedic diet charts for patients</p>
      </div>

      {/* Generator Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generate New Diet Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Select Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose patient" />
                </SelectTrigger>
                <SelectContent>
                  {initialPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} ({patient.age} yrs)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Disease</Label>
              <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose disease" />
                </SelectTrigger>
                <SelectContent>
                  {diseases.map((disease) => (
                    <SelectItem key={disease.disease} value={disease.disease}>
                      {disease.disease}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="accent" size="lg" className="w-full h-12 gap-2" onClick={handleGenerate}>
                <FileText className="h-5 w-5" />
                Generate Chart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Chart */}
      {generatedChart && (
        <Card className="shadow-elevated print:shadow-none" id="diet-chart">
          <CardHeader className="bg-gradient-green text-primary-foreground rounded-t-lg print:bg-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-display text-2xl">Ayurvedic Diet Chart</CardTitle>
                  <p className="text-primary-foreground/80">Personalized Nutrition Plan</p>
                </div>
              </div>
              <div className="flex gap-2 print:hidden">
                <Button variant="secondary" size="sm" className="gap-2" onClick={handlePrint}>
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="secondary" size="sm" className="gap-2" onClick={handlePrint}>
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Patient Info */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-primary flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </h3>
                <div className="bg-muted rounded-xl p-4 space-y-2">
                  <p><strong>Name:</strong> {generatedChart.patient.name}</p>
                  <p><strong>Age:</strong> {generatedChart.patient.age} years</p>
                  <p><strong>Gender:</strong> {generatedChart.patient.gender}</p>
                  <p><strong>Weight:</strong> {generatedChart.patient.weight} kg</p>
                  <p><strong>Height:</strong> {generatedChart.patient.height} cm</p>
                  <p><strong>Blood Group:</strong> {generatedChart.patient.bloodGroup}</p>
                  <p><strong>Lifestyle:</strong> {generatedChart.patient.lifestyle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-primary flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Condition & Ayurvedic View
                </h3>
                <div className="bg-leaf-light rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {generatedChart.disease.disease}
                    </Badge>
                    <Badge variant="outline" className="border-primary text-primary">
                      {generatedChart.disease.ayurvedicView}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <p className="font-display text-2xl font-bold text-accent">{generatedChart.disease.calories}</p>
                      <p className="text-sm text-muted-foreground">Daily Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl font-bold text-primary">{generatedChart.disease.proteinsG}g</p>
                      <p className="text-sm text-muted-foreground">Protein</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diet Recommendations */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Recommended Foods
                </h3>
                <div className="bg-leaf-light rounded-xl p-6">
                  <p className="text-foreground leading-relaxed">{generatedChart.disease.recommendedFoods}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive" />
                  Foods to Avoid
                </h3>
                <div className="bg-destructive/10 rounded-xl p-6">
                  <p className="text-foreground leading-relaxed">{generatedChart.disease.foodsToAvoid}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Sample Diet Plan
                </h3>
                <div className="bg-muted rounded-xl p-6">
                  <div className="space-y-4">
                    {generatedChart.disease.sampleDietPlan.split("|").map((meal: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                        <p className="text-foreground">{meal.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Macronutrient Distribution */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-semibold text-foreground">Daily Macronutrient Targets</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-accent/10 rounded-xl border-2 border-accent/20">
                  <p className="font-display text-3xl font-bold text-accent">{generatedChart.disease.carbsG}g</p>
                  <p className="text-muted-foreground">Carbohydrates</p>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-xl border-2 border-primary/20">
                  <p className="font-display text-3xl font-bold text-primary">{generatedChart.disease.proteinsG}g</p>
                  <p className="text-muted-foreground">Proteins</p>
                </div>
                <div className="text-center p-6 bg-muted rounded-xl border-2 border-border">
                  <p className="font-display text-3xl font-bold text-foreground">{generatedChart.disease.fatsG}g</p>
                  <p className="text-muted-foreground">Fats</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
              <p>Generated on {generatedChart.generatedAt.toLocaleDateString()} at {generatedChart.generatedAt.toLocaleTimeString()}</p>
              <p className="mt-1">Ayurvedic Diet Chart Generator • For Medical Professional Use</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietChartGenerator;
