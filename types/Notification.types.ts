import { NotificationParams } from '@/types/NotificationManager.types';

export type Link = {
    name: string;
    href: string;
};

export enum Variant {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export class Notification {
    readonly duration = 4000;
    close = false;
    title: string;
    id: number;
    variant: Variant;
    closable: boolean;
    hidden: boolean;
    minimizable: boolean;
    indefinite: boolean;
    link: Link;
    additionalInfo?: string;
    message?:
        | string
        | {
              component: unknown;
              data: unknown;
          }
        | {
              component: unknown;
              data: unknown;
          }[];
    transactionFlow?: {
        component: unknown;
        data: unknown;
    };

    constructor(params: NotificationParams, id: number) {
        this.title = params.title;
        this.hidden = false;
        this.id = id;
        this.variant = params.variant;
        this.message = params.message;
        this.closable = params.closable;
        this.additionalInfo = params.additionalInfo;
        this.minimizable = this.variant === Variant.LOADING;
        this.link = params.link;
        this.indefinite = params.indefinite;
        this.transactionFlow = params.transactionFlow;
    }

    remove() {
        this.close = true;
    }

    setSuccess(message: string, indefinite = false) {
        this.indefinite = indefinite;
        this.closable = indefinite;
        this.variant = Variant.SUCCESS;
        this.message = message;
        this.minimizable = false;
    }

    setError(message: string, indefinite = false) {
        this.indefinite = indefinite;
        this.closable = indefinite;
        this.minimizable = false;
        this.message = message;
        this.variant = Variant.ERROR;
    }
}
