import { DocumentData, QuerySnapshot } from 'firebase/firestore';

/**
 * Generic wrapper type for constructors, used in the DI system.
 */
// tslint:disable-next-line:interface-over-type-literal
export type Constructor<T> = {
  // tslint:disable-next-line:no-any
  new (...args: any[]): T;
};

/* Snapshot for Firebase calls. */
export type Snapshot = QuerySnapshot<DocumentData, DocumentData>;

/** Current permissions. */
export enum Permission {
  EDIT = "edit",  // Used for experimenters
  PREVIEW = "preview",  // Used for experimenter
  PARTICIPATE = "participate", // Used for participant
}

/** Color modes. */
export enum ColorMode {
  LIGHT = "light",
  DARK = "dark",
  DEFAULT = "default",
}

/** Color themes. */
export enum ColorTheme {
  KAMINO = "kamino",
}

/** Text sizes. */
export enum TextSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

// TODO: Clean up temporary types
export interface ChatMessage {
  id: string;
  author: string;
  content: string;
}

export interface Profile {
  id: string;
  name: string;
  pronouns: string;
  avatar: string;
}