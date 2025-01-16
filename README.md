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
|____XThing.style.tsx -> if component has >=3 or has too much subcomponent code
|____README.md -> Optional readme  
|__windows -> Contains collection of window contents  
hooks -> Reusable hooks  
resources -> images/videos/icons  
theme -> theme setup  
ui -> ui utilities  
utils -> utilities which may be used independently of ui stuff (more generic)

#### Notes

* Import for the style (XThing.style.tsx) is usually done like so  
  ```import { * as S } from "./XThing.style.tsx";```
* Component should only have 1 component return (ex XThing.tsx should export
  XThing.tsx as component and no other components), if there are more components
  move them to another script.