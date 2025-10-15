package JavaExercises.OperatorPrograms;

public class xor {
    public static void main(String[] args) {
        int arr[]={3,0,4,1};
        int xor=0;
        int n=arr.length;
        for(int i =0;i<=n;i++){
            xor^=i;
        }
        for(int num :arr)
{
    xor^=num;
}
System.out.println(xor);
        
    }
    
}

