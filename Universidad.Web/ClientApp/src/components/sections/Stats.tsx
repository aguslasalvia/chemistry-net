import { stats } from '@data/home';

const Stats = () => {
    return (
        <section className="bg-fq-dark px-[clamp(20px,5vw,64px)] py-8">
            <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <div className="font-display text-[clamp(28px,3.4vw,40px)] leading-none font-extrabold text-fq-primary-light">
                            {stat.value}
                        </div>
                        <div className="mt-1 text-[13.5px] text-white/75">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
