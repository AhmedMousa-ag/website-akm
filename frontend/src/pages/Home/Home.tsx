import { BasePage } from "../../components/BasePage";
import { HomePageContent } from "../../components/Home/HomeContent";
export const HomePage = ({ className }: { className?: string }) => {
  return (
    <BasePage cssClass={className}>
      <div className="animate-bounce animate-bounce-slow">
        <title>Ahmed Karem Mousa</title>
        <p>
          Hi, I'm Ahmed ~ <strong>I</strong> get <strong>Things Done!</strong>
        </p>
      </div>
      <HomePageContent />
    </BasePage>
  );
};
