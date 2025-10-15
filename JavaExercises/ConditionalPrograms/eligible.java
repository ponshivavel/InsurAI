package JavaExercises.ConditionalPrograms;

import java.util.Scanner;

public class eligible{
    public static void main(String[] args) {
          Scanner in = new Scanner(System.in);
           System.out.println("ENTER THE AGE TO GO TO RIDE");
           int n = in.nextInt();
          if(n>18 && 35>n) System.out.println("you can work so you are eligible to apply");
          in.close();
    }
}
