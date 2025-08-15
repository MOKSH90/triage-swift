import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, User, Leaf, Eye, Heart, Brain } from "lucide-react";

interface PatientData {
  name: string;
  age: string;
  gender: string;
  constitution: string;
  symptoms: string[];
  pulse: string;
  tongue: string;
  digestion: string;
  sleep: string;
  stress: string;
  appetite: string;
  bowelMovement: string;
  urination: string;
  energy: string;
  mood: string;
  skinCondition: string;
  symptomsText: string;
}

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PatientData>({
    name: "",
    age: "",
    gender: "",
    constitution: "",
    symptoms: [],
    pulse: "",
    tongue: "",
    digestion: "",
    sleep: "",
    stress: "",
    appetite: "",
    bowelMovement: "",
    urination: "",
    energy: "",
    mood: "",
    skinCondition: "",
    symptomsText: ""
  });

  const ayurvedicSymptoms = [
    "Anxiety & Restlessness", "Joint Pain & Stiffness", "Digestive Issues", "Constipation", 
    "Insomnia", "Dry Skin", "Headaches", "Irregular Appetite", "Bloating & Gas", 
    "Acid Reflux", "Excessive Heat", "Skin Rashes", "Hair Loss", "Excessive Sweating",
    "Heavy Feeling", "Congestion", "Lethargy", "Weight Gain", "Cold Hands/Feet", "Depression"
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.gender) {
      toast.error("Please fill in all required patient information");
      return;
    }

    if (!formData.pulse || !formData.tongue || !formData.constitution) {
      toast.error("Please provide essential Ayurvedic assessments");
      return;
    }

    // Store form data in localStorage for the result page
    localStorage.setItem('patientData', JSON.stringify(formData));
    
    toast.success("Patient data submitted successfully!");
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Ayurvedic Patient Assessment</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Patient Information</span>
                </CardTitle>
                <CardDescription>
                  Basic patient information and constitutional assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Age in years"
                      min="0"
                      max="150"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="constitution">Prakriti (Constitution) *</Label>
                    <Select value={formData.constitution} onValueChange={(value) => setFormData(prev => ({ ...prev, constitution: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select constitution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vata">Vata (Air + Space)</SelectItem>
                        <SelectItem value="pitta">Pitta (Fire + Water)</SelectItem>
                        <SelectItem value="kapha">Kapha (Earth + Water)</SelectItem>
                        <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                        <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                        <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                        <SelectItem value="tridosha">Tridosha (Balanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ayurvedic Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-treatmentHerbs" />
                  <span>Ayurvedic Assessment</span>
                </CardTitle>
                <CardDescription>
                  Traditional Ayurvedic examination and observation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pulse">Pulse (Nadi) Assessment *</Label>
                    <Select value={formData.pulse} onValueChange={(value) => setFormData(prev => ({ ...prev, pulse: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pulse quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vata-pulse">Vata (Irregular, Quick)</SelectItem>
                        <SelectItem value="pitta-pulse">Pitta (Strong, Jumping)</SelectItem>
                        <SelectItem value="kapha-pulse">Kapha (Slow, Steady)</SelectItem>
                        <SelectItem value="weak">Weak</SelectItem>
                        <SelectItem value="rapid">Rapid</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tongue">Tongue (Jihva) Examination *</Label>
                    <Select value={formData.tongue} onValueChange={(value) => setFormData(prev => ({ ...prev, tongue: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tongue condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pink-clean">Pink & Clean</SelectItem>
                        <SelectItem value="white-coating">White Coating</SelectItem>
                        <SelectItem value="yellow-coating">Yellow Coating</SelectItem>
                        <SelectItem value="dry-cracked">Dry & Cracked</SelectItem>
                        <SelectItem value="red-inflamed">Red & Inflamed</SelectItem>
                        <SelectItem value="pale">Pale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="digestion">Digestive Fire (Agni)</Label>
                    <Select value={formData.digestion} onValueChange={(value) => setFormData(prev => ({ ...prev, digestion: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select digestion quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strong">Strong (Tikshna Agni)</SelectItem>
                        <SelectItem value="variable">Variable (Vishama Agni)</SelectItem>
                        <SelectItem value="slow">Slow (Manda Agni)</SelectItem>
                        <SelectItem value="normal">Normal (Sama Agni)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleep">Sleep Quality</Label>
                    <Select value={formData.sleep} onValueChange={(value) => setFormData(prev => ({ ...prev, sleep: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sleep pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sound">Sound & Restful</SelectItem>
                        <SelectItem value="light">Light Sleep</SelectItem>
                        <SelectItem value="interrupted">Interrupted</SelectItem>
                        <SelectItem value="insomnia">Insomnia</SelectItem>
                        <SelectItem value="excessive">Excessive Sleep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appetite">Appetite</Label>
                    <Select value={formData.appetite} onValueChange={(value) => setFormData(prev => ({ ...prev, appetite: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select appetite level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strong">Strong</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="weak">Weak</SelectItem>
                        <SelectItem value="irregular">Irregular</SelectItem>
                        <SelectItem value="excessive">Excessive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="energy">Energy Level (Ojas)</Label>
                    <Select value={formData.energy} onValueChange={(value) => setFormData(prev => ({ ...prev, energy: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select energy level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="depleted">Depleted</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Symptoms & Lifestyle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-doshaPitta" />
                  <span>Symptoms & Lifestyle Assessment</span>
                </CardTitle>
                <CardDescription>
                  Current symptoms and lifestyle factors affecting health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Current Symptoms</Label>
                  <p className="text-sm text-muted-foreground mb-4">Select all symptoms that apply</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ayurvedicSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={formData.symptoms.includes(symptom)}
                          onCheckedChange={(checked) => handleSymptomChange(symptom, !!checked)}
                        />
                        <Label htmlFor={symptom} className="text-sm cursor-pointer">
                          {symptom}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.symptoms.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Selected symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.symptoms.map((symptom) => (
                          <Badge key={symptom} variant="secondary">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stress">Stress Level</Label>
                    <Select value={formData.stress} onValueChange={(value) => setFormData(prev => ({ ...prev, stress: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mood">Mental State</Label>
                    <Select value={formData.mood} onValueChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mental state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calm">Calm & Peaceful</SelectItem>
                        <SelectItem value="anxious">Anxious</SelectItem>
                        <SelectItem value="irritable">Irritable</SelectItem>
                        <SelectItem value="depressed">Depressed</SelectItem>
                        <SelectItem value="restless">Restless</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="symptomsText">Detailed Symptoms & Health History</Label>
                  <Textarea
                    id="symptomsText"
                    value={formData.symptomsText}
                    onChange={(e) => setFormData(prev => ({ ...prev, symptomsText: e.target.value }))}
                    placeholder="Describe your symptoms in detail, including onset, duration, triggers, and any previous treatments. Include family history, lifestyle factors, diet patterns, and other relevant health information..."
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Our Ayurvedic AI will analyze this information to determine dosha imbalances and recommend appropriate treatments
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Leaf className="h-5 w-5 text-treatmentHerbs" />
                    <span>Ayurvedic AI will analyze doshas and recommend personalized treatment</span>
                  </div>
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                    Submit for Ayurvedic Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;