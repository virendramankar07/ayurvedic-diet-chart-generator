import { useState } from "react";
import { Plus, Search, Edit2, Trash2, User, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Patient, initialPatients, bloodGroups, lifestyles, generatePatientId } from "@/data/patients";
import { diseases } from "@/data/diseases";

interface FormData {
  name: string;
  age: string;
  gender: Patient["gender"];
  weight: string;
  height: string;
  bloodGroup: string;
  disease: string;
  medications: string;
  allergies: string;
  lifestyle: Patient["lifestyle"];
  contact: string;
  address: string;
  notes: string;
}

interface PatientFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
}

const PatientForm = ({ formData, onFormChange }: PatientFormProps) => (
  <div className="grid gap-4 max-h-[70vh] overflow-y-auto pr-2">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFormChange("name", e.target.value)}
          placeholder="Patient name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age *</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => onFormChange("age", e.target.value)}
          placeholder="Age"
          required
        />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select value={formData.gender} onValueChange={(v) => onFormChange("gender", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          value={formData.weight}
          onChange={(e) => onFormChange("weight", e.target.value)}
          placeholder="Weight"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          type="number"
          value={formData.height}
          onChange={(e) => onFormChange("height", e.target.value)}
          placeholder="Height"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="bloodGroup">Blood Group</Label>
        <Select value={formData.bloodGroup} onValueChange={(v) => onFormChange("bloodGroup", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {bloodGroups.map((bg) => (
              <SelectItem key={bg} value={bg}>{bg}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lifestyle">Lifestyle</Label>
        <Select value={formData.lifestyle} onValueChange={(v) => onFormChange("lifestyle", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {lifestyles.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="disease">Disease / Symptoms</Label>
      <Select value={formData.disease} onValueChange={(v) => onFormChange("disease", v)}>
        <SelectTrigger><SelectValue placeholder="Select disease" /></SelectTrigger>
        <SelectContent>
          {diseases.map((d) => (
            <SelectItem key={d.disease} value={d.disease}>{d.disease}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="medications">Medications</Label>
        <Input
          id="medications"
          value={formData.medications}
          onChange={(e) => onFormChange("medications", e.target.value)}
          placeholder="Current medications"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies</Label>
        <Input
          id="allergies"
          value={formData.allergies}
          onChange={(e) => onFormChange("allergies", e.target.value)}
          placeholder="Known allergies"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => onFormChange("contact", e.target.value)}
          placeholder="Phone number"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => onFormChange("address", e.target.value)}
          placeholder="City / Address"
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        value={formData.notes}
        onChange={(e) => onFormChange("notes", e.target.value)}
        placeholder="Additional notes"
        rows={3}
      />
    </div>
  </div>
);

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "Male",
    weight: "",
    height: "",
    bloodGroup: "A+",
    disease: "",
    medications: "",
    allergies: "",
    lifestyle: "Moderate",
    contact: "",
    address: "",
    notes: "",
  });

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "Male",
      weight: "",
      height: "",
      bloodGroup: "A+",
      disease: "",
      medications: "",
      allergies: "",
      lifestyle: "Moderate",
      contact: "",
      address: "",
      notes: "",
    });
  };

  const handleAddPatient = () => {
    const newPatient: Patient = {
      id: generatePatientId(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      bloodGroup: formData.bloodGroup,
      disease: formData.disease,
      medications: formData.medications,
      allergies: formData.allergies,
      lifestyle: formData.lifestyle,
      contact: formData.contact,
      address: formData.address,
      notes: formData.notes,
      createdAt: new Date(),
    };

    setPatients([...patients, newPatient]);
    resetForm();
    setIsAddDialogOpen(false);
    toast({
      title: "Patient added",
      description: `${newPatient.name} has been added successfully.`,
    });
  };

  const handleEditPatient = () => {
    if (!editingPatient) return;

    const updatedPatients = patients.map((p) =>
      p.id === editingPatient.id
        ? {
            ...p,
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            bloodGroup: formData.bloodGroup,
            disease: formData.disease,
            medications: formData.medications,
            allergies: formData.allergies,
            lifestyle: formData.lifestyle,
            contact: formData.contact,
            address: formData.address,
            notes: formData.notes,
          }
        : p
    );

    setPatients(updatedPatients);
    resetForm();
    setEditingPatient(null);
    toast({
      title: "Patient updated",
      description: "Patient information has been updated.",
    });
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id));
    toast({
      title: "Patient removed",
      description: "Patient has been removed from the system.",
    });
  };

  const openEditDialog = (patient: Patient) => {
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
      weight: patient.weight.toString(),
      height: patient.height.toString(),
      bloodGroup: patient.bloodGroup,
      disease: patient.disease,
      medications: patient.medications,
      allergies: patient.allergies,
      lifestyle: patient.lifestyle,
      contact: patient.contact,
      address: patient.address,
      notes: patient.notes,
    });
    setEditingPatient(patient);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.disease.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Patient Management</h2>
          <p className="text-muted-foreground">Manage patient records and health information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="gap-2" onClick={resetForm}>
              <Plus className="h-4 w-4" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Add New Patient</DialogTitle>
            </DialogHeader>
            <PatientForm formData={formData} onFormChange={handleFormChange} />
            <Button variant="default" onClick={handleAddPatient} disabled={!formData.name || !formData.age}>
              Add Patient
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients by name or disease..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patients Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} yrs • {patient.gender} • {patient.bloodGroup}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Dialog open={editingPatient?.id === patient.id} onOpenChange={(open) => !open && setEditingPatient(null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(patient)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-display text-xl">Edit Patient</DialogTitle>
                      </DialogHeader>
                      <PatientForm formData={formData} onFormChange={handleFormChange} />
                      <Button variant="default" onClick={handleEditPatient}>
                        Save Changes
                      </Button>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeletePatient(patient.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-leaf-light text-primary">
                  {patient.disease || "No disease specified"}
                </Badge>
                <Badge variant="outline">{patient.lifestyle}</Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Weight:</span> {patient.weight} kg
                  <span className="font-medium ml-2">Height:</span> {patient.height} cm
                </p>
                {patient.allergies && (
                  <p><span className="font-medium">Allergies:</span> {patient.allergies}</p>
                )}
              </div>
              {patient.contact && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {patient.contact}
                </div>
              )}
              {patient.address && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {patient.address}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-display text-xl text-muted-foreground mb-2">No patients found</h3>
          <p className="text-muted-foreground/70">Add your first patient to get started</p>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;
