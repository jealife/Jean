export default function Footer() {
    return (
        <footer className="py-16 pb-8 border-t border-text-primary/10 text-center bg-primary">
            <div className="container mx-auto px-4">
                <div className="text-2xl mb-6 font-extrabold text-text-primary flex justify-center items-center gap-2 font-heading">
                    <i className="bx bx-code-alt text-accent-primary"></i> Jean Guylane
                </div>
                <p className="text-text-muted text-sm mt-8 font-body">
                    &copy; {new Date().getFullYear()} Jean Guylane Memiaghe. Tous droits
                    réservés.
                </p>
            </div>
        </footer>
    );
}
