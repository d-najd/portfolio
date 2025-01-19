// Sadly this REFUSES to work, found an alternative (less boiler-platy) way
import "styled-components"
import type { ThemeType } from "./theme"

declare module "styled-components" {
	export interface ThemeTest extends ThemeType {}
}
