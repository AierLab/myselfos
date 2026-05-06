import { Users, Target, Calendar, Archive } from 'lucide-react';
import { useLanguage } from '../i18n/language';

const icons = [Users, Archive, Target, Calendar];

export default function CampaignBar() {
  const { t } = useLanguage();
  const stats = t.campaignBar.stats;

  return (
    <section className="relative z-10 border-y border-gold/15 bg-forest-deep/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = icons[index];
            return (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 group"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Icon size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs sm:text-sm font-inter tracking-wider uppercase">{stat.label}</p>
                <p className="text-ivory text-sm sm:text-base font-inter font-medium mt-0.5">{stat.value}</p>
                <p className="text-ivory/40 text-xs font-inter mt-0.5">{stat.sub}</p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
