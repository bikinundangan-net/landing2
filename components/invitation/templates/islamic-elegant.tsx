import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  ClosingCredit,
  EventList,
  GallerySection,
  HeroImage,
  MusicPanel,
  OpeningButton,
  RsvpGuestbookSection,
} from "@/components/invitation/templates/shared";

export function IslamicElegant(props: InvitationTemplateProps) {
  const { invitation, selectedPackage, heroAsset, galleryAssets, videoAsset, musicAsset, display } = props;

  return (
    <main className="min-h-screen scroll-smooth bg-[#0c2b35] text-[#f5e8c8]">
      <section className="relative grid min-h-[100svh] place-items-end overflow-hidden px-5 pt-12 text-center">
        <HeroImage
          asset={heroAsset}
          alt={`Foto ${display.names}`}
          className="absolute inset-0 opacity-16"
          overlayClassName="absolute inset-0 bg-[#0c2b35]/70"
        />
        <div className="absolute inset-x-6 bottom-0 top-16 rounded-t-[14rem] border border-[#d7b46a]/65 bg-[#fff8e9] text-[#102636]" />
        <div className="relative z-10 mx-auto w-full max-w-2xl pb-10 text-[#102636]">
          <div className="mx-auto mb-5 h-16 w-16 rounded-full border border-[#d7b46a] bg-[#0c2b35] text-[#d7b46a]" />
          <p className="mx-auto max-w-md text-sm leading-7 text-[#8b6b2a]">
            ومن آياته أن خلق لكم من أنفسكم أزواجاً
          </p>
          <p className="mt-5 text-sm font-black uppercase tracking-[0.24em]">The Wedding of</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-tight sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.5em] text-[#b98d3c]">&</span>
            {invitation.groom_name}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-7">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i.
          </p>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em]">{display.eventDay}</p>
          <p className="font-serif text-4xl font-bold">{display.eventDateShort}</p>
          <p className="mt-2 text-sm font-bold">{display.location}</p>
          <OpeningButton className="mx-auto mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-[#d7b46a] bg-[#0d6670] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(12,43,53,0.25)]" />
        </div>
      </section>
      <section id="invitation-content" className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-[2rem] border border-[#d7b46a]/45 bg-[#113641] p-7 text-center">
          <h2 className="font-serif text-5xl font-bold text-[#f5e8c8]">Rangkaian Acara</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#f5e8c8]/72">
            {invitation.love_story ??
              "Kami berharap kehadiran dan doa restu keluarga serta sahabat menjadi keberkahan bagi langkah baru kami."}
          </p>
          <MusicPanel
            invitation={invitation}
            musicAsset={musicAsset}
            className="mx-auto mt-6 inline-flex max-w-md flex-col gap-3 rounded-full border border-[#d7b46a]/35 bg-[#0c2b35] px-5 py-3 text-sm font-bold sm:flex-row sm:items-center"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-4">
        <EventList
          invitation={invitation}
          className="grid gap-5 md:grid-cols-2"
          itemClassName="rounded-[2rem] border border-[#d7b46a]/45 bg-[#113641] p-7 text-center"
          iconClassName="mx-auto size-7 text-[#d7b46a]"
          buttonClassName="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#d7b46a] px-5 py-3 text-sm font-black text-[#102636]"
        />
      </section>
      <GallerySection
        assets={galleryAssets}
        videoAsset={videoAsset}
        sectionClassName="mx-auto max-w-6xl px-5 py-16"
        titleClassName="text-center font-serif text-5xl font-bold text-[#f5e8c8]"
        gridClassName="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        imageClassName="aspect-[5/4] rounded-[1.5rem] border border-[#d7b46a]/35 object-cover"
      />
      <RsvpGuestbookSection
        invitation={invitation}
        sectionClassName="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-2"
        panelClassName="rounded-[2rem] border border-[#d7b46a]/45 bg-[#113641] p-6"
        inputClassName="min-h-12 rounded-full border border-[#d7b46a]/25 bg-[#fff8e9] px-4 py-3 text-sm font-bold text-[#102636] outline-none"
        buttonClassName="rounded-full bg-[#d7b46a] px-5 py-3 text-sm font-black text-[#102636]"
        iconClassName="size-6 text-[#d7b46a]"
      />
      <ClosingCredit invitation={invitation} selectedPackage={selectedPackage} className="px-5 pb-12 pt-3 text-center" />
    </main>
  );
}
