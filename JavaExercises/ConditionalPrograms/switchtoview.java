package JavaExercises.ConditionalPrograms;
import java.util.*;
public class switchtoview  {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
          System.out.println("ENTER THE NUMBER TO VIEW THE DETIALS\n1->Strategic Advisor (Formal & Insightful)\n2->Technical Architect (Precise & Solution-Oriented)\n3->Innovation Catalyst (Bold & Visionary)");
  int n = in.nextInt();
  switch (n) {
    case 1:
    System.out.println("Your data infrastructure holds untapped potential for predictive analytics and operational efficiency.\n" + //
                "\n" + 
                "Integrating AI-driven forecasting can reduce waste and optimize supply chains.\n" + 
                "\n" + 
                "Ethical AI deployment will enhance brand trust and regulatory compliance.\n" + 
                "\n" + 
                "Invest in upskilling your workforce to align with AI transformation.\n" + 
                "\n" + 
                "Let’s co-create scalable models that drive measurable impact across global markets.    ");
        break;
         case 2:
    System.out.println("Your current systems can benefit from reinforcement learning for dynamic decision-making.\n" + 
                "\n" + "Deploying federated learning will protect user privacy while improving model accuracy.\n" + 
                "\n" + "Real-time anomaly detection can safeguard against fraud and system failures.\n" + 
                "\n" + "Modular AI pipelines will future-proof your tech stack against evolving demands.\n" + "\n" + "");
        break;
         case 3:
    System.out.println("AI isn’t just a tool—it’s your next competitive edge.\n" + 
                "\n" + 
                "Imagine automating 80% of routine tasks while unlocking new revenue streams.\n" +  "\n" +"Let’s build a digital twin of your enterprise to simulate and optimize decisions.\n" +  "\n" + "With generative AI, your brand can personalize experiences at scale.\n" +  "\n" +  "The future is adaptive, intelligent, and human-centric—let’s lead it together. ");
        break;
  
    default:
    System.out.println("soon we update it ...about this more");
        break;
  }
  in.close();

    }
    
}
