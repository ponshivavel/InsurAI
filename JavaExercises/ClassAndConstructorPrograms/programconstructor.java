package JavaExercises.ClassAndConstructorPrograms;

public class programconstructor {
   String name;
    int id;
    public programconstructor(String name, int id) {
        this.name =name;
      this.id = id;
        System.out.println("Constructor called:\n " + name + "\nID: " + id);
    }
 

    public static void main(String[] args) {
     
        programconstructor obj  = new programconstructor("Ponshivavel", 101);
        
    }

}
