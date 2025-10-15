package JavaExercises.OperatorPrograms;

public class gates { 
   
    public static void main(String[] args) {
        boolean A = true;
        boolean B = false;
        boolean andgate = A && B;
        boolean orgate = A || B;
        boolean notA = !A;
        boolean notB = !B;
        

        System.out.println("A = " + A);
          System.out.println("B = " + B);
         System.out.println("A AND B =" + andgate);
        System.out.println("A OR B = " + orgate);
             System.out.println("NOT A= " + notA);
        System.out.println("NOT B = " + notB);
       
    }
}
    

