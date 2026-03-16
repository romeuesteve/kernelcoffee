import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I cancel my Cron Job anytime?',
    answer: 'Yes. No contracts, no commitment. You can cancel your Cron Job anytime from your dashboard with one click. We believe in earning your business every month.',
  },
  {
    question: 'How is this different from other specialty coffee?',
    answer: 'We classify coffee by workflow, not just flavor profile. Each stack is engineered for specific cognitive states—STABLE_RELEASE for consistent focus, DEBUG_MODE for clarity, CRITICAL_HOTFIX for emergencies, SAFE_MODE for late-night work. It\'s about performance, not just taste.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently we ship throughout Spain and the EU. We\'re expanding to more markets soon. Join our newsletter to be notified when we launch in your country.',
  },
  {
    question: 'What if I don\'t like my first box?',
    answer: 'We offer a 100% money-back guarantee on your first box. If you\'re not satisfied, we\'ll refund you immediately—no questions asked.',
  },
  {
    question: 'Can I switch between workflows?',
    answer: 'Absolutely. You can change your workflow preference anytime from your dashboard. Many community members switch between STABLE_RELEASE during sprints and DEBUG_MODE during complex problem-solving sessions.',
  },
  {
    question: 'How fresh is the coffee?',
    answer: 'We roast in small batches and ship within 48 hours of roasting. Your coffee arrives at peak freshness, typically 3-5 days post-roast.',
  },
  {
    question: 'What\'s the difference between the workflows?',
    answer: 'STABLE_RELEASE provides consistent, linear energy for daily work. DEBUG_MODE offers balanced mental clarity for complex tasks. CRITICAL_HOTFIX delivers maximum caffeine for emergencies. SAFE_MODE is low-stimulation for late-night coding without sleep disruption.',
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Kernel Coffee
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions */}
          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a
              href="mailto:hello@kernelcoffee.com"
              className="text-primary font-semibold hover:underline"
            >
              hello@kernelcoffee.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
