# Work in progress

## Project Structure

app -> react store, slices, hooks, etc... setup  
components -> Reusable components  
features -> UI and state  
|__x-thing  
|____components -> optional folder containing components for the main
component  
|____XThing.tsx -> React component  
|____xThingSlice.ts -> The slice    
|____XThing.style.tsx -> if component contains more than 3 subcomponents
|____README.md -> Optional readme  
|__windows -> Contains collection of window contents
hooks -> Reusable hooks  
resources -> images/videos/icons  
theme -> theme setup  
ui -> ui utilities  
utils -> utilities which may be used independently of ui stuff (more generic)  