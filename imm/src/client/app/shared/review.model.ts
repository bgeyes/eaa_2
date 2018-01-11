export interface Review {
      name: string;
      make: string;
      model: string;
      version: string;
      yearOfReg: number;
      avgMlg: string;
      typicalMpg: string;
      ownershipPeriod: string;
      stateAtPurchase: string;
      usage: string;
      review: string;
      recommend: Boolean;
      rating: any;
      commonProblems: any;
      location: string;
      performanta?: any;
      fiabilitate?: any;
      costuri?: any;
      performantaText?: string;
      fiabilitateText?: string;
      costuriText?: string;
    }