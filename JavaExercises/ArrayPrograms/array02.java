package JavaExercises.ArrayPrograms;

import java.util.Arrays;

public class array02 {
    public static void main(String[] args) {
        int ind =2; int value=0;
        int []arr={1,3,5,3};int i=0;
        int []arrnew = new int[arr.length+1];
        for(int j =0;j<arrnew.length;j++){

            if(j==ind) arrnew[j]=value;
            if(j>ind) arrnew[j]=arr[i-1];
            else arrnew[j]=arr[i];
            i++;

        }
        System.out.println(Arrays.toString(arrnew));

    }
}
