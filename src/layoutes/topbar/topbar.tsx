import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import {navigation} from "../navigation";
import type { Page, LayoutProps } from "../../types/app";

export function TopBar ({page, setPage}: LayoutProps) {
    const navigate = (nextPage: Page) => {
        setPage(nextPage); 
    }
    
    return (
        <div className='topbar flex gap-4 justify-end p-2'>
            <NavigationMenu>
                <NavigationMenuList>
                    {navigation.map((item)=>(
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={()=> navigate(item.id)}>
                                {item.label}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}


