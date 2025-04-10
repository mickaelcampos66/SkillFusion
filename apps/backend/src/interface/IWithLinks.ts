export interface IWithLinks {
    links: {
      self: string;
      [key: string]: string | null;
    };
};
