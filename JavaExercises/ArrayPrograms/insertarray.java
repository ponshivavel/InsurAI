package JavaExercises.ArrayPrograms;

import java.util.Arrays;

public class insertarray {
    public static void main(String[] args) {
        int ind =2; int value=0;
        int []arr={1,3,5,3};
        int []arrnew = new int[arr.length+1];
        for(int j =0;j<ind;j++){
            arrnew[j]=arr[j];
           }
             arrnew[ind]=value;
             for(int i =ind;i<arrnew.length-1;i++){
                arrnew[i+1] =arr[i];
             }

        System.out.println(Arrays.toString(arrnew));

    }
}
