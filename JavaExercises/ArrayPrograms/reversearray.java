package JavaExercises.ArrayPrograms;

import java.util.Arrays;

public class reversearray {
    public static void main(String[] args) {
    int arr[]= {1,2,4,5}; 
    int i =0;
    int j=arr.length-1;
       while(i<=j){
      int temp = arr[i];
      arr[i]=arr[j];
      arr[j] =temp;
      i++;j--;
        }
         System.out.print(Arrays.toString(arr));
    }
    
}
