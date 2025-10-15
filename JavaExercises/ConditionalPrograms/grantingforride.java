package JavaExercises.ConditionalPrograms;
import java.util.*;
public class grantingforride {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.println("ENTER THE AGE TO GO TO RIDE");
  int n = in.nextInt();
  if(n>18) System.out.println("you can go to this ride");
  else if(n==18) System.out.println("sorry you can go in next year");
  else System.out.println("sorry you cannot go this not safe for you");
  in.close();
    }
}