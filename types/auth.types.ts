import { Action, Resource } from "@/constants/permissions";

export enum Roles {
    ADMIN="admin",
    SEO_EXECUTIVE="seo_executive",
    SEO_MANAGER="seo_manager",
    CONTENT_WRITER="content_writer",
    USER="user"
}


export type Permisssions = {
    [key in Resource]?: {
        [action in Action]?: boolean
    }
}
