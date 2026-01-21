export default function Contact() {
    return (
        <section
            className="section container mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start"
            id="contact"
        >
            <div data-aos="fade-right">
                <h2 className="mb-6 text-3xl md:text-4xl font-bold font-heading">
                    Travaillons <span className="text-gradient">Ensemble</span>
                </h2>
                <p className="text-text-secondary mb-10 font-body">
                    Vous avez un projet en tête ou souhaitez simplement échanger ?
                    N'hésitez pas à me contacter.
                </p>

                <div className="flex items-center gap-6 mb-8">
                    <div className="w-[60px] h-[60px] rounded-2xl bg-primary-tertiary flex items-center justify-center text-accent-primary text-2xl border border-text-primary/10 shrink-0">
                        <i className="bx bx-envelope"></i>
                    </div>
                    <div>
                        <h4 className="mb-1 text-base font-heading font-semibold">Email</h4>
                        <span className="text-text-muted text-sm break-all font-body">
                            jealife.pictures@gmail.com
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-8">
                    <div className="w-[60px] h-[60px] rounded-2xl bg-primary-tertiary flex items-center justify-center text-accent-primary text-2xl border border-text-primary/10 shrink-0">
                        <i className="bx bx-map"></i>
                    </div>
                    <div>
                        <h4 className="mb-1 text-base font-heading font-semibold">
                            Localisation
                        </h4>
                        <span className="text-text-muted text-sm font-body">
                            Libreville, Gabon
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 mt-12">
                    <a
                        href="http://instagram.com/jealife_pictures"
                        target="_blank"
                        className="w-11 h-11 rounded-full bg-primary-secondary flex items-center justify-center text-text-secondary text-xl border border-text-primary/10 transition-all hover:bg-accent-primary hover:text-white hover:-translate-y-1"
                    >
                        <i className="bx bxl-instagram"></i>
                    </a>
                    <a
                        href="https://github.com/jealife"
                        target="_blank"
                        className="w-11 h-11 rounded-full bg-primary-secondary flex items-center justify-center text-text-secondary text-xl border border-text-primary/10 transition-all hover:bg-accent-primary hover:text-white hover:-translate-y-1"
                    >
                        <i className="bx bxl-github"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        className="w-11 h-11 rounded-full bg-primary-secondary flex items-center justify-center text-text-secondary text-xl border border-text-primary/10 transition-all hover:bg-accent-primary hover:text-white hover:-translate-y-1"
                    >
                        <i className="bx bxl-linkedin"></i>
                    </a>
                </div>
            </div>

            <form
                action="https://submit-form.com/Q6PX1HC6"
                className="bg-primary-secondary p-8 md:p-12 rounded-lg border border-text-primary/10"
                data-aos="fade-left"
            >
                <input
                    type="hidden"
                    name="_redirect"
                    value="https://jea-life.vercel.app/"
                />
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-text-secondary text-sm font-medium font-heading"
                    >
                        Votre Nom
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-primary-tertiary border border-text-primary/10 p-4 rounded-sm text-text-primary font-body transition-colors focus:outline-none focus:border-accent-primary"
                        required
                        placeholder="Ex: Jean Dupont"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-text-secondary text-sm font-medium font-heading"
                    >
                        Votre Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-primary-tertiary border border-text-primary/10 p-4 rounded-sm text-text-primary font-body transition-colors focus:outline-none focus:border-accent-primary"
                        required
                        placeholder="Ex: jean@example.com"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="message"
                        className="block mb-2 text-text-secondary text-sm font-medium font-heading"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full bg-primary-tertiary border border-white/8 p-4 rounded-sm text-white font-body transition-colors focus:outline-none focus:border-accent-primary min-h-[150px] resize-y"
                        required
                        placeholder="Dites-moi tout sur votre projet..."
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Envoyer le Message <i className="bx bx-send"></i>
                </button>
            </form>
        </section>
    );
}
