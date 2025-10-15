package JavaExercises.LoopingPrograms;

public class evencount {
    public static void main(String[] args) {
        int n =1023234334,count=0;
        while(n>0){
            int d = n%10;
            if(d%2==0) count++;
            n/=10;
        }
        System.out.println("COUNT OF THE EVEN NUMBER IS "+count);
    }
    
}
