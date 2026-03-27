export interface WellStatus {
  id: string;
  battery: string;
  status: 'producing' | 'si' | 'maintenance';
  action: string;
  info: string;
}

export const MOCK_WELLS_DATA: WellStatus[] = [
  { id: '32', battery: '497/498', status: 'producing', action: 'BEST IN FIELD (Roger) - Running 24hr/day', info: "734' / OH COMP" },
  { id: '30', battery: '497/498', status: 'producing', action: 'Standard cycles: 4-6 hrs per day', info: "750' / 732-740" },
  { id: '31', battery: '497/498', status: 'si', action: 'Makes oil & wtr - needs 1 week test', info: "750' / TBD" },
  { id: '33', battery: '497/498', status: 'si', action: 'Motor added - install breaker / 1 wk test', info: "719' / 706-714" },
  { id: '35', battery: '497/498', status: 'si', action: '100% Water. No pump jack on site.', info: "775' / 660-668" },
  { id: '36', battery: '497/498', status: 'producing', action: '4-6 hrs (Tried mud acid trial)', info: "773' / 730-742" },
  { id: '21', battery: '499', status: 'producing', action: 'Needs required well sign installed', info: "Standard" },
  { id: '22', battery: '499', status: 'producing', action: 'Needs unit staked down securely', info: "Standard" },
  { id: '23', battery: '499', status: 'producing', action: 'Repair timer and associated wiring', info: "Standard" },
  { id: '24', battery: '499', status: 'producing', action: 'Standard 4-6 hrs per day', info: "840' / 718-724" },
  { id: '4', battery: '500/501', status: 'producing', action: 'Standard 4-6 hrs per day', info: "850' / TBD" },
  { id: '6', battery: '500/501', status: 'maintenance', action: 'Broken belt - install new belt and restart', info: "Repair" },
  { id: '7', battery: '500/501', status: 'si', action: 'Needs new motor swap and restart sequence', info: "770' / 742-752" }
];
