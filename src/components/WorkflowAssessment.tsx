import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Flame, Lightbulb, Coffee, Scale, CloudSun, Sun } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; icon: any }[];
}

const questions: Question[] = [
  {
    id: 'challenge',
    question: 'What is your primary work challenge?',
    options: [
      { value: 'focus', label: 'Maintaining focus', icon: Target },
      { value: 'energy', label: 'Sustaining energy', icon: Flame },
      { value: 'creativity', label: 'Sparking creativity', icon: Lightbulb },
      { value: 'balance', label: 'Finding balance', icon: Scale },
    ],
  },
  {
    id: 'hours',
    question: 'How many hours do you work daily?',
    options: [
      { value: '4-6', label: '4-6 hours', icon: CloudSun },
      { value: '6-8', label: '6-8 hours', icon: Sun },
      { value: '8+', label: '8+ hours', icon: Flame },
    ],
  },
  {
    id: 'habit',
    question: 'What is your current coffee habit?',
    options: [
      { value: '1', label: '1 cup/day', icon: Coffee },
      { value: '2-3', label: '2-3 cups/day', icon: Coffee },
      { value: '4+', label: '4+ cups/day', icon: Coffee },
    ],
  },
];

const results: Record<string, { title: string; description: string; workflow: string }> = {
  'focus-4-6-1': { title: 'Flow State Specialist', description: 'You need balanced energy for focused sessions without overdoing it.', workflow: 'Flow State' },
  'focus-4-6-2-3': { title: 'Flow State Specialist', description: 'You need balanced energy for focused sessions without overdoing it.', workflow: 'Flow State' },
  'focus-4-6-4+': { title: 'Deep Work Specialist', description: 'You need sustained clarity for long work sessions.', workflow: 'Deep Work' },
  'focus-6-8-1': { title: 'Flow State Specialist', description: 'You need balanced energy for focused sessions without overdoing it.', workflow: 'Flow State' },
  'focus-6-8-2-3': { title: 'Deep Work Specialist', description: 'You need sustained clarity for extended focus.', workflow: 'Deep Work' },
  'focus-6-8-4+': { title: 'Deep Work Specialist', description: 'You need maximum focus for marathon sessions.', workflow: 'Deep Work' },
  'focus-8+-1': { title: 'Deep Work Specialist', description: 'You need sustained clarity for marathon sessions.', workflow: 'Deep Work' },
  'focus-8+-2-3': { title: 'Deep Work Specialist', description: 'You need maximum focus for long work days.', workflow: 'Deep Work' },
  'focus-8+-4+': { title: 'Debug Mode Specialist', description: 'You need high-intensity fuel for demanding work.', workflow: 'Debug Mode' },
  'energy-4-6-1': { title: 'Flow State Specialist', description: 'You need gentle, sustained energy throughout the day.', workflow: 'Flow State' },
  'energy-4-6-2-3': { title: 'Flow State Specialist', description: 'You need gentle, sustained energy throughout the day.', workflow: 'Flow State' },
  'energy-4-6-4+': { title: 'Deep Work Specialist', description: 'You need reliable energy without the crash.', workflow: 'Deep Work' },
  'energy-6-8-1': { title: 'Flow State Specialist', description: 'You need all-day energy without jitters.', workflow: 'Flow State' },
  'energy-6-8-2-3': { title: 'Deep Work Specialist', description: 'You need sustained energy for long work days.', workflow: 'Deep Work' },
  'energy-6-8-4+': { title: 'Debug Mode Specialist', description: 'You need powerful, consistent energy for marathon sessions.', workflow: 'Debug Mode' },
  'energy-8+-1': { title: 'Deep Work Specialist', description: 'You need sustained energy for demanding schedules.', workflow: 'Deep Work' },
  'energy-8+-2-3': { title: 'Debug Mode Specialist', description: 'You need maximum energy for intense work days.', workflow: 'Debug Mode' },
  'energy-8+-4+': { title: 'Debug Mode Specialist', description: 'You need high-octane fuel for extreme work schedules.', workflow: 'Debug Mode' },
  'creativity-4-6-1': { title: 'Flow State Specialist', description: 'You need creative clarity without the crash.', workflow: 'Flow State' },
  'creativity-4-6-2-3': { title: 'Flow State Specialist', description: 'You need creative clarity without the crash.', workflow: 'Flow State' },
  'creativity-4-6-4+': { title: 'Flow State Specialist', description: 'You need balanced energy for creative work.', workflow: 'Flow State' },
  'creativity-6-8-1': { title: 'Flow State Specialist', description: 'You need smooth, creative energy all day.', workflow: 'Flow State' },
  'creativity-6-8-2-3': { title: 'Flow State Specialist', description: 'You need balanced fuel for creative sessions.', workflow: 'Flow State' },
  'creativity-6-8-4+': { title: 'Deep Work Specialist', description: 'You need sustained energy for creative marathons.', workflow: 'Deep Work' },
  'creativity-8+-1': { title: 'Flow State Specialist', description: 'You need creative clarity for long sessions.', workflow: 'Flow State' },
  'creativity-8+-2-3': { title: 'Flow State Specialist', description: 'You need balanced creative energy.', workflow: 'Flow State' },
  'creativity-8+-4+': { title: 'Deep Work Specialist', description: 'You need sustained energy for creative work.', workflow: 'Deep Work' },
  'balance-4-6-1': { title: 'Flow State Specialist', description: 'You need balanced energy for harmony.', workflow: 'Flow State' },
  'balance-4-6-2-3': { title: 'Flow State Specialist', description: 'You need balanced energy for harmony.', workflow: 'Flow State' },
  'balance-4-6-4+': { title: 'Flow State Specialist', description: 'You need smooth energy throughout the day.', workflow: 'Flow State' },
  'balance-6-8-1': { title: 'Flow State Specialist', description: 'You need balanced energy for work-life harmony.', workflow: 'Flow State' },
  'balance-6-8-2-3': { title: 'Flow State Specialist', description: 'You need smooth, sustainable energy.', workflow: 'Flow State' },
  'balance-6-8-4+': { title: 'Deep Work Specialist', description: 'You need reliable energy without burnout.', workflow: 'Deep Work' },
  'balance-8+-1': { title: 'Flow State Specialist', description: 'You need gentle energy for balance.', workflow: 'Flow State' },
  'balance-8+-2-3': { title: 'Flow State Specialist', description: 'You need balanced fuel for long days.', workflow: 'Flow State' },
  'balance-8+-4+': { title: 'Deep Work Specialist', description: 'You need sustainable energy without burnout.', workflow: 'Deep Work' },
};

export function WorkflowAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResultKey = () => {
    return `${answers['challenge']}-${answers['hours']}-${answers['habit']}` || 'focus-6-8-2-3';
  };

  const result = results[getResultKey()] || results['focus-6-8-2-3'];

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setEmail('');
  };

  return (
    <section id="assessment" className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl mx-auto">
          {!showResult ? (
            <Card className="border-primary/20">
              <CardContent className="p-8 md:p-12">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-center">
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {questions[currentQuestion].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className="p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                      >
                        <div className="flex items-center gap-4">
                          {typeof option.icon === 'string' ? (
                            <span className="text-3xl group-hover:scale-110 transition-transform">{option.icon}</span>
                          ) : (
                            <div className="h-10 w-10">
                              <option.icon className="h-full w-full" />
                            </div>
                          )}
                          <span className="font-medium text-lg">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
             <Card className="border-primary/20 overflow-hidden">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 text-center">
                <div className="h-16 w-16 mx-auto mb-4">
                  <Target className="h-full w-full" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Your Workflow Profile</h3>
                <p className="text-xl text-primary font-semibold">{result.title}</p>
              </div>

              <CardContent className="p-8 space-y-6">
                <p className="text-lg text-center text-muted-foreground">
                  {result.description}
                </p>

                <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">Your Recommended Workflow</div>
                    <div className="text-2xl font-bold text-primary">{result.workflow}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Get your full workflow analysis (free)</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                    />
                    <Button>Send</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send your complete workflow guide plus a special trial offer.
                  </p>
                </div>

                <div className="pt-4 border-t border-border text-center">
                  <button
                    onClick={resetAssessment}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Retake assessment
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
