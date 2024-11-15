import * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "src/components/Layout/Collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "src/components/Layout/SideBar";

export type FileTreeProps = {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  items: {
    title: string;
    isActive: boolean;
    action:
      | {
          url: string;
        }
      | {
          onClick: () => void;
        };
  }[];
};

export function FileTree({ trees }: { trees: FileTreeProps[] }) {
  return (
    <>
      <SidebarMenu>
        {trees.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.items.length > 0 && item.isOpen}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const handleClick = (
                        event: React.MouseEvent<HTMLAnchorElement>
                      ) => {
                        if ("onClick" in subItem.action) {
                          event.preventDefault();
                          subItem.action.onClick();
                        }
                      };

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="cursor-pointer"
                            isActive={subItem.isActive}
                          >
                            <a
                              href={
                                "url" in subItem.action
                                  ? subItem.action.url
                                  : undefined
                              }
                              onClick={handleClick}
                            >
                              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {subItem.title}
                              </span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </>
  );
}
