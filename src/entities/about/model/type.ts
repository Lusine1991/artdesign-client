export interface AboutData {
  hero: {
    
    title: string;
    description: string;
     companyName: string;
      address: string;
      phone: string;
      email: string;
   
  };
  statistics: {
    id: number;
    value: string;
    label: string;
  }[];
  mission: {
    title: string;
    description: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
}
