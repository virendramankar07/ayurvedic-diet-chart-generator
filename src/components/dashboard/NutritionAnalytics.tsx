import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { diseases, type DiseaseData } from "@/data/diseases";

const NutritionAnalytics = () => {
  // Prepare data for charts
  const calorieData = diseases.slice(0, 10).map((d: DiseaseData) => ({
    name: d.disease.length > 12 ? d.disease.substring(0, 12) + "..." : d.disease,
    calories: d.calories,
    fullName: d.disease,
  }));

  const macroData = [
    { name: "Carbohydrates", value: 55, color: "hsl(36, 91%, 44%)" },
    { name: "Proteins", value: 25, color: "hsl(149, 42%, 30%)" },
    { name: "Fats", value: 20, color: "hsl(150, 25%, 75%)" },
  ];

  const ayurvedicViewData = [
    { view: "Balances Kapha", count: diseases.filter((d: DiseaseData) => d.ayurvedicView.includes("Kapha")).length },
    { view: "Balances Pitta", count: diseases.filter((d: DiseaseData) => d.ayurvedicView.includes("Pitta") && !d.ayurvedicView.includes("Kapha")).length },
    { view: "Balances Vata", count: diseases.filter((d: DiseaseData) => d.ayurvedicView.includes("Vata") && !d.ayurvedicView.includes("Pitta")).length },
    { view: "Other", count: diseases.filter((d: DiseaseData) => !d.ayurvedicView.includes("Kapha") && !d.ayurvedicView.includes("Pitta") && !d.ayurvedicView.includes("Vata")).length },
  ];

  const avgNutrition = {
    avgCalories: Math.round(diseases.reduce((sum: number, d: DiseaseData) => sum + d.calories, 0) / diseases.length),
    avgCarbs: Math.round(diseases.reduce((sum: number, d: DiseaseData) => sum + d.carbsG, 0) / diseases.length),
    avgProteins: Math.round(diseases.reduce((sum: number, d: DiseaseData) => sum + d.proteinsG, 0) / diseases.length),
    avgFats: Math.round(diseases.reduce((sum: number, d: DiseaseData) => sum + d.fatsG, 0) / diseases.length),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Nutrition Analytics</h2>
        <p className="text-muted-foreground">Visual insights into disease-wise nutritional recommendations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Avg. Daily Calories</p>
            <p className="font-display text-3xl font-bold text-accent">{avgNutrition.avgCalories}</p>
            <p className="text-xs text-muted-foreground mt-1">kcal / day</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Avg. Carbohydrates</p>
            <p className="font-display text-3xl font-bold text-primary">{avgNutrition.avgCarbs}g</p>
            <p className="text-xs text-muted-foreground mt-1">per day</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Avg. Proteins</p>
            <p className="font-display text-3xl font-bold text-primary">{avgNutrition.avgProteins}g</p>
            <p className="text-xs text-muted-foreground mt-1">per day</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm">Avg. Fats</p>
            <p className="font-display text-3xl font-bold text-foreground">{avgNutrition.avgFats}g</p>
            <p className="text-xs text-muted-foreground mt-1">per day</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calorie Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Calories by Disease (Top 10)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calorieData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} kcal`,
                      props.payload.fullName,
                    ]}
                  />
                  <Bar dataKey="calories" fill="hsl(149, 42%, 30%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Macronutrient Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Recommended Macro Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ayurvedic View Distribution */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Diseases by Ayurvedic Classification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ayurvedicViewData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis 
                    dataKey="view" 
                    type="category" 
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} diseases`, "Count"]}
                  />
                  <Bar dataKey="count" fill="hsl(36, 91%, 44%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display">Disease Database Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Disease</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Calories</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Carbs (g)</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Proteins (g)</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Fats (g)</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Ayurvedic View</th>
                </tr>
              </thead>
              <tbody>
                {diseases.slice(0, 15).map((disease: DiseaseData, index: number) => (
                  <tr key={disease.disease} className={`border-b border-border/50 ${index % 2 === 0 ? "bg-muted/30" : ""}`}>
                    <td className="py-3 px-4 font-medium text-foreground">{disease.disease}</td>
                    <td className="py-3 px-4 text-center text-accent font-semibold">{disease.calories}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{disease.carbsG}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{disease.proteinsG}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{disease.fatsG}</td>
                    <td className="py-3 px-4 text-primary">{disease.ayurvedicView}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Showing 15 of {diseases.length} diseases. Full database available in Disease Search.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionAnalytics;
