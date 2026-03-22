import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const MAP = {
  home: HomeOutlined,
  user: UserOutlined,
  calendar: CalendarOutlined,
  file: FileTextOutlined,
  team: TeamOutlined,
  chart: BarChartOutlined,
};

export function FeatureIcon({ iconKey, style, className }) {
  const Cmp = MAP[iconKey] || HomeOutlined;
  return <Cmp style={style} className={className} />;
}
