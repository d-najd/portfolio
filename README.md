# Work in progress

## Project Structure

app -> react store, slices, hooks, etc... setup  
components -> Reusable components  
features -> UI and state  
|**x-thing  
|\_\_\_**components -> optional folder containing components for the main
component  
|**\_**XThing.tsx -> React component  
|**\_**xThingSlice.ts -> The slice  
|**\_**XThing.style.tsx -> if component has >=3 or has too much subcomponent
code |**\_**README.md -> Optional readme  
|\_\_windows -> Contains collection of window contents  
hooks -> Reusable hooks  
resources -> images/videos/icons  
theme -> theme setup  
ui -> ui utilities  
utils -> utilities which may be used independently of ui stuff (more generic)

#### Notes

- Import for the style (XThing.style.tsx) is usually done like so  
  `import { * as S } from "./XThing.style.tsx";`
- Component should only have 1 component return (ex XThing.tsx should export
  XThing.tsx as component and no other components), if there are more components
  move them to another script.
