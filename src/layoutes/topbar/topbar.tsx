import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import {navigation} from "../navigation";
import type { Page, LayoutProps } from "../../types/app";
import { Bold, User } from "lucide-react";

export function TopBar ({page, setPage}: LayoutProps) {
    const navigate = (nextPage: Page) => {
        setPage(nextPage); 
    }
    
    return (
        <div className='topbar flex gap-4 justify-between p-2 items-center'>
            <div className="flex gap-2">
                <h4 className="font-bold">Administracion de usuarios</h4>
                <User size={20} />
            </div>
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


