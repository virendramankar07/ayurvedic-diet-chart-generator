import { useState, ChangeEvent } from "react";
import { Search, Leaf, Check, X, Flame, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { diseases, type DiseaseData, searchDiseases } from "@/data/diseases";

const DiseaseSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<DiseaseData | null>(null);

  const filteredDiseases = searchQuery ? searchDiseases(searchQuery) : diseases;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Disease Search</h2>
        <p className="text-muted-foreground">Search Ayurvedic dietary recommendations by disease</p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search disease (e.g., Diabetes, Hypertension, Arthritis...)"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 text-base"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Disease List */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-2">
          <p className="text-sm text-muted-foreground mb-3">
            {filteredDiseases.length} diseases found
          </p>
          {filteredDiseases.map((disease: DiseaseData) => (
            <button
              key={disease.disease}
              onClick={() => setSelectedDisease(disease)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selectedDisease?.disease === disease.disease
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "bg-card hover:bg-muted shadow-soft"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{disease.disease}</h4>
                  <p className={`text-sm ${selectedDisease?.disease === disease.disease ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {disease.ayurvedicView}
                  </p>
                </div>
                <Leaf className={`h-5 w-5 ${selectedDisease?.disease === disease.disease ? "text-accent" : "text-primary/30"}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Disease Details */}
        <div className="lg:col-span-2">
          {selectedDisease ? (
            <Card className="shadow-elevated sticky top-6">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-display text-2xl text-primary">
                      {selectedDisease.disease}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2 bg-leaf-light text-primary">
                      <Leaf className="h-3 w-3 mr-1" />
                      {selectedDisease.ayurvedicView}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Daily Calories</p>
                    <p className="font-display text-3xl font-bold text-accent">{selectedDisease.calories}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Macros */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <Flame className="h-5 w-5 mx-auto mb-2 text-accent" />
                    <p className="font-display text-2xl font-bold text-foreground">{selectedDisease.carbsG}g</p>
                    <p className="text-sm text-muted-foreground">Carbs</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <Droplets className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="font-display text-2xl font-bold text-foreground">{selectedDisease.proteinsG}g</p>
                    <p className="text-sm text-muted-foreground">Proteins</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <div className="w-5 h-5 mx-auto mb-2 bg-accent rounded-full" />
                    <p className="font-display text-2xl font-bold text-foreground">{selectedDisease.fatsG}g</p>
                    <p className="text-sm text-muted-foreground">Fats</p>
                  </div>
                </div>

                {/* Recommended Foods */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Recommended Foods
                  </h4>
                  <div className="bg-leaf-light rounded-xl p-4">
                    <p className="text-foreground">{selectedDisease.recommendedFoods}</p>
                  </div>
                </div>

                {/* Foods to Avoid */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive" />
                    Foods to Avoid
                  </h4>
                  <div className="bg-destructive/10 rounded-xl p-4">
                    <p className="text-foreground">{selectedDisease.foodsToAvoid}</p>
                  </div>
                </div>

                {/* Sample Diet Plan */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Sample Diet Plan</h4>
                  <div className="bg-muted rounded-xl p-4 space-y-2">
                    {selectedDisease.sampleDietPlan.split("|").map((meal: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <p className="text-foreground">{meal.trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-center py-20">
              <div>
                <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display text-xl text-muted-foreground mb-2">Select a Disease</h3>
                <p className="text-muted-foreground/70 max-w-sm mx-auto">
                  Click on any disease from the list to view detailed Ayurvedic dietary recommendations
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseSearch;
