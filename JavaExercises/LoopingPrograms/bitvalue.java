package JavaExercises.LoopingPrograms;

public class bitvalue {
    public static void main(String[] args) {
        int n =20;String bitvalue =" ";

        do{
            int d = n%2;
            bitvalue += d+"";
            n/=2;
        }while(n>0);
        System.out.print("BIT VALUE FOR "+n+" is:"+bitvalue);
    }
    
}
