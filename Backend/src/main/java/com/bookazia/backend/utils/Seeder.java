package com.bookazia.backend.utils;

import com.bookazia.backend.config.SecurityConfig;
import com.bookazia.backend.dao.*;
import com.bookazia.backend.models.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Component
public class Seeder {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;
    private final SecurityConfig securityConfig;
    private final CustomUserRepository customUserRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final SavedItemsCartRepository savedItemsCartRepository;

    public Seeder(CategoryRepository categoryRepository, ProductRepository productRepository,
                  AuthorRepository authorRepository, PublisherRepository publisherRepository,
                  SecurityConfig securityConfig, CustomUserRepository customUserRepository, ShoppingCartRepository shoppingCartRepository, SavedItemsCartRepository savedItemsCartRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
        this.securityConfig = securityConfig;
        this.customUserRepository = customUserRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.savedItemsCartRepository = savedItemsCartRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        CustomUser customUser = new CustomUser("admin@bookazia.com", this.securityConfig.passwordEncoder().encode("Wow123!!!"), "admin", "", "" );
        customUser.setRole(Role.ROLE_ADMIN);
        ShoppingCart shoppingCart = new ShoppingCart();
        SavedItemsCart savedItemsCart = new SavedItemsCart();
        this.shoppingCartRepository.save(shoppingCart);
        this.savedItemsCartRepository.save(savedItemsCart);
        customUser.setShoppingCart(shoppingCart);
        customUser.setSavedItemsCart(savedItemsCart);
        this.customUserRepository.save(customUser);

        Category fiction = new Category("Fiction", "Fictie", "A genre focused on eliciting fear and dread through supernatural, psychological, or monstrous elements.");
        Category scifi = new Category("Science-Fiction", "wetenschapsfictie", "Fast-paced and exciting stories that often feature physical feats, intense sequences, and daring adventures.");
        Category fantasy = new Category("Fantasy", "Fantasie", "A genre designed to entertain and amuse with humor, satire, and light-hearted situations.");
        Category drama = new Category("Drama", "Drama", "A genre that involves magical elements, mythical creatures, and worlds beyond the realms of reality.");
        Category humor = new Category("Humor", "Humor", "Fiction based on imagined scientific advancements, futuristic technology, and extraterrestrial life.");
        Category exploratory = new Category("Exploratory", "Verkennend", "Stories that focus on the development of a romantic relationship, often with emotional depth and personal growth.");
        Category romance = new Category("Romance", "Romantiek", "A suspenseful genre that keeps readers on edge with tension, danger, and unexpected twists.");
        Category nonfiction = new Category("Non-fiction", "Non-fictie", "Stories set in a specific historical period, blending fictional characters or events with real historical context.");
        Category mystery = new Category("Mystery", "Mysterie", "A genre that emphasizes exploration, excitement, and action, often with the protagonist embarking on a perilous journey.");
        Category action = new Category("Action", "Actie", "A genre dedicated to factual accounts, true stories, and informative content.");
        Category adventure = new Category("Adventure", "Avontuur", "A genre that emphasizes exploration, excitement, and action, often with the protagonist embarking on a perilous journey.");
        Category historical = new Category("Historical", "Historisch", "Stories set in a specific historical period, blending fictional characters or events with real historical context.");
        Category psychological = new Category("Psychological", "Psychologisch", "A genre that explores the psychological states of its characters, often delving into their inner thoughts and emotions.");
        Category classics = new Category("Classics", "Klassiekers", "Beschrijving voor Klassiekers.");
        Category political = new Category("Political", "Politiek", "Beschrijving voor Politiek.");
        Category satire = new Category("Satire", "Satire", "Beschrijving voor Satire.");
        Category general = new Category("General", "Algemeen", "Beschrijving voor Algemeen.");
        Category thriller = new Category("Thrillers", "Thrillers", "Beschrijving voor Mysterie & Thrillers.");
        Category paranormal = new Category("Paranormal", "Paranormaal", "Beschrijving voor Paranormaal.");
        Category family = new Category("Family", "Familie", "Beschrijving voor Familie.");
        Category social_themes = new Category("Social Themes", "Sociale Thema's", "Beschrijving voor Sociale Thema's.");
        categoryRepository.saveAll(List.of(fiction, scifi, fantasy, drama, humor, exploratory, romance, nonfiction, mystery, action, adventure, historical, psychological, classics, political, satire, general, thriller, paranormal, family, social_themes));

        Author author0 = new Author("George", "Orwell", "Biography for George Orwell.");
        Author author1 = new Author("Simon", "Carmiggelt", "Biography for Simon Carmiggelt.");
        Author author2 = new Author("James", "Baldwin", "Biography for James Baldwin.");
        Author author3 = new Author("Emily", "Bronte", "Biography for Emily Bronte.");
        Author author4 = new Author("Albert", "Camus", "Biography for Albert Camus.");
        Author author5 = new Author("Rebecca", "Yarros", "Biography for Rebecca Yarros.");
        Author author6 = new Author("Ryohgo", "Narita", "Biography for Ryohgo Narita.");
        Author author7 = new Author("Sarah", "J. Maas", "Biography for Sarah J. Maas.");
        Author author8 = new Author("Tracy", "Banghart", "Biography for Tracy Banghart.");
        Author author9 = new Author("Orchard", "Books and Cartwheel Staff", "Biography for Orchard Books and Cartwheel Staff.");
        Author author10 = new Author("My", "Little Pony Staff", "Biography for My Little Pony Staff.");
        Author author11 = new Author("Kristin", "Hannah", "Biography for Kristin Hannah.");
        Author author12 = new Author("Lisa", "Jewell", "Biography for Lisa Jewell.");
        Author author13 = new Author("Ann", "Patchett", "Biography for Ann Patchett.");
        Author author14 = new Author("Emily", "Henry", "Biography for Emily Henry.");
        Author author15 = new Author("James", "McBride", "Biography for James McBride.");
        Author author16 = new Author("Shelby", "Van Pelt", "Biography for Shelby Van Pelt.");
        Author author17 = new Author("Stephenie", "Meyer", "Biography for Stephenie Meyer.");
        Author author18 = new Author("John", "Green", "Biography for John Green.");
        Author author19 = new Author("Scott", "Westerfeld", "Biography for Scott Westerfeld.");
        Author author20 = new Author("Gail", "Carson Levine", "Biography for Gail Carson Levine.");
        Author author21 = new Author("James", "Dashner", "Biography for James Dashner.");
        Author author22 = new Author("Suzanne", "Collins", "American author of young adult literature, whose works include The Hunger Games trilogy and The Underland Chronicles series. The daughter of an Air Force officer, she lives in her native home of Connecticut.");
        Author author23 = new Author("John.", "Green", "John Green's first novel, Looking for Alaska, won the 2006 Michael L. Printz Award presented by the American Library Association. His second novel, An Abundance of Katherines, was a 2007 Michael L. Printz Award Honor Book and a finalist for the Los Angeles Times Book Prize. His next novel, Paper Towns, is a New York Times bestseller and won the Edgar Allen Poe Award for Best YA Mystery. In 2007, John and his brother Hank were the hosts of a popular internet blog, \"Brotherhood 2.0,\" where they discussed their lives, books and current events every day for a year except for weekends and holidays.");
        Author author24 = new Author("J.K", "Rowling", "Author of dystopian classics like 1984 and Animal Farm.");
        Author author25 = new Author("Harper", "Lee", "Nelle Harper Lee was an American novelist. She wrote the 1960 novel To Kill a Mockingbird that won the 1961 Pulitzer Prize and became a classic of modern American literature. Lee received numerous accolades and honorary degrees, including the Presidential Medal of Freedom in 2007 which was awarded for her contribution to literature. She assisted her close friend Truman Capote in his research for the book In Cold Blood (1966). Capote was the basis for the character Dill Harris in To Kill a Mockingbird.");
        Author author26 = new Author("F. Scott", "Fitzgerald", "American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century.");
        Author author27 = new Author("Herman", "Melville", "American novelist, short story writer, and poet of the American Renaissance period.");
        Author author28 = new Author("Leo", "Tolstoy", "Russian writer who is regarded as one of the greatest authors of all time.");
        Author author29 = new Author("J. D.", "Salinger", "American writer known for his widely read novel, The Catcher in the Rye.");
        Author author30 = new Author("Aldous", "Huxley", "English writer and philosopher, author of nearly fifty books.");
        Author author31 = new Author("Charlotte", "Brontë", "English novelist and poet, the eldest of the three Brontë sisters who survived into adulthood.");
        Author author32 = new Author("J. R. R.", "Tolkien", "English writer, poet, philologist, and academic, best known for The Hobbit and The Lord of the Rings.");
        Author author33 = new Author("Fyodor", "Dostoevsky", "Russian novelist, short story writer, essayist, and journalist.");
        Author author34 = new Author("Homerus", "", "Ancient Greek poet traditionally said to be the author of the epic poems the Iliad and the Odyssey.");
        authorRepository.saveAll(List.of(author0, author1, author2, author3, author4, author5, author6, author7, author8, author9, author10, author11, author12, author13, author14, author15, author16, author17, author18, author19, author20, author21, author22, author23, author24, author25, author26, author27, author28, author29, author30, author31, author32, author33, author34));

        Publisher publisher0 = new Publisher("Penguin", "Publishing Group");
        Publisher publisher1 = new Publisher("Arbeiderspers", "");
        Publisher publisher2 = new Publisher("Penguin", "");
        Publisher publisher3 = new Publisher("Knopf", "Doubleday Publishing Group");
        Publisher publisher4 = new Publisher("Little,", "Brown Book Group Limited");
        Publisher publisher5 = new Publisher("Yen", "Press LLC");
        Publisher publisher6 = new Publisher("Bloomsbury", "USA");
        Publisher publisher7 = new Publisher("Little,", "Brown Books for Young Readers");
        Publisher publisher8 = new Publisher("Hachette", "Children's Group");
        Publisher publisher9 = new Publisher("St.", "Martin's Publishing Group");
        Publisher publisher10 = new Publisher("Entangled", "Publishing, LLC");
        Publisher publisher11 = new Publisher("Simon", "and Schuster");
        Publisher publisher12 = new Publisher("HarperCollinsPublishers", "");
        Publisher publisher13 = new Publisher("HarperCollins", "Publishers");
        Publisher publisher14 = new Publisher("Little,", "Brown");
        Publisher publisher15 = new Publisher("Speak", "");
        Publisher publisher16 = new Publisher("Simon", "Pulse");
        Publisher publisher17 = new Publisher("Scholastic", "Incorporated");
        Publisher publisher18 = new Publisher("Random", "House Children's Books");
        Publisher publisher19 = new Publisher("Scholastic", "Inc");
        Publisher publisher20 = new Publisher("Dutton", "Books");
        Publisher publisher21 = new Publisher("Grand Central", "Publishing");
        Publisher publisher22 = new Publisher("Signet", "Classics");
        Publisher publisher23 = new Publisher("New American", "Library");
        publisherRepository.saveAllAndFlush(List.of(publisher0, publisher1, publisher2, publisher3, publisher4, publisher5, publisher6, publisher7, publisher8, publisher9, publisher10, publisher11, publisher12, publisher13, publisher14, publisher15, publisher16, publisher17, publisher18, publisher19, publisher20, publisher21, publisher22, publisher23));

        Product product0 = new Product(
                "Animal Farm",
                BigDecimal.valueOf(18.56),
                73,
                "9780451526342",
                "75th Anniversary Edition—Includes a New Introduction by Téa Obreht George Orwell's timeless and timely allegorical novel — a scathing satire on a downtrodden society’s blind march towards totalitarianism. “All animals are equal, but some animals are more equal than others.” A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned — a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. When Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwell’s masterpiece have a meaning and message still ferociously fresh.",
                "75e jubileumeditie - inclusief een nieuwe inleiding door Téa Obreht George Orwells tijdloze en actuele allegorische roman - een bijtende satire op de blinde mars van een onderdrukte samenleving richting totalitarisme. 'Alle dieren zijn gelijk, maar sommige dieren zijn gelijker dan andere.' Een boerderij wordt overgenomen door zijn overwerkte, mishandelde dieren. Met vlammend idealisme en roerende slogans proberen ze een paradijs van vooruitgang, rechtvaardigheid en gelijkheid te creëren. Zo is het toneel gezet voor een van de meest veelzeggende satirische fabels ooit geschreven - een messcherp sprookje voor volwassenen dat de evolutie vastlegt van revolutie tegen tirannie naar een even verschrikkelijk totalitarisme. Toen Animal Farm voor het eerst werd gepubliceerd, werd het stalinistische Rusland gezien als het doelwit. Vandaag de dag is het vernietigend duidelijk dat waar en wanneer de vrijheid ook wordt aangevallen, onder welke vlag dan ook, de snijdende helderheid en wrede komedie van George Orwells meesterwerk een betekenis en boodschap hebben die nog steeds fel vers is.",
                "https://books.google.com/books/publisher/content?id=Q8eNEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73MT_a6ix5pvQLG8pGyfEYf72rRMDHdNgFqRxxVEHZlmpnDg3q07N-e0IanhpKmAzU4N3CO2LuLAF687ULp9wtOIb-8DcltvDjYMgYlWXni6VVjfpAoQcuT7mTLJqwotYomuKIw&source=gbs_api",
                LocalDate.parse("2004-04-06"),
                "English",
                176,
                Set.of("paperback"),
                Set.of(author0),
                Set.of(satire, political, classics, fiction),
                publisher0,
                true);

        Product product1 = new Product(
                "Giovanni's Room",
                BigDecimal.valueOf(19.72),
                39,
                "9780141032948",
                "When David meets the sensual Giovanni in a bohemian bar, he is swept into a passionate love affair. But his girlfriend's return to Paris destroys everything. Unable to admit to the truth, David pretends the liaison never happened - while Giovanni's life descends into tragedy. United by the theme of love, the writings in the Great Loves series span over two thousand years and vastly different worlds. Readers will be introduced to love's endlessly fascinating possibilities and extremities: romantic love, platonic love, erotic love, gay love, virginal love, adulterous love, parental love, filial love, nostalgic love, unrequited love, illicit love, not to mention lost love, twisted and obsessional love...",
                "Wanneer David de sensuele Giovanni ontmoet in een bohemienbar, raakt hij verwikkeld in een hartstochtelijke liefdesaffaire. Maar de terugkeer van zijn vriendin naar Parijs maakt alles kapot. David kan de waarheid niet toegeven en doet alsof de liaison nooit heeft plaatsgevonden - terwijl Giovanni's leven in een tragedie vervalt. De boeken in de serie Grote Liefdes, verenigd door het thema liefde, beslaan meer dan tweeduizend jaar en totaal verschillende werelden. Lezers maken kennis met de eindeloos fascinerende mogelijkheden en uitersten van de liefde: romantische liefde, platonische liefde, erotische liefde, homoseksuele liefde, maagdelijke liefde, overspelige liefde, ouderliefde, kinderliefde, nostalgische liefde, onbeantwoorde liefde, ongeoorloofde liefde, om nog maar te zwijgen van verloren liefde, verwrongen en obsessieve liefde...",
                "https://books.google.com/books/content?id=qYqHPwAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE725Bu_yvi0_FbsVbDglg4xZ7Xh9gXJohEqdcVTm433ntBTuljXGGtNe3v2931kvMtqB8gxxcmCcsajdUX0ObsuP3onLcwGUdlxCOidQ8ecZRb8TauhPv-4gm3ODw4QLjUFJhGxt&source=gbs_api",
                LocalDate.parse("2007-01-01"),
                "English",
                149,
                Set.of("paperback"),
                Set.of(author2),
                Set.of(romance, thriller, scifi, fantasy, fiction, family, paranormal, classics),
                publisher2,
                true);

        Product product2 = new Product(
                "Wuthering Heights",
                BigDecimal.valueOf(22.39),
                25,
                "9780141439556",
                "One of English literature's classic masterpieces—a gripping novel of love, propriety, and tragedy. Nominated as one of America’s best-loved novels by PBS’s The Great American ReadEmily Brontë's only novel endures as a work of tremendous and far-reaching influence. The Penguin Classics edition is the definitive version of the text, edited with an introduction by Pauline Nestor. Lockwood, the new tenant of Thrushcross Grange, situated on the bleak Yorkshire moors, is forced to seek shelter one night at Wuthering Heights, the home of his landlord. There he discovers the history of the tempestuous events that took place years before. What unfolds is the tale of the intense love between the gypsy foundling Heathcliff and Catherine Earnshaw. Catherine, forced to choose between passionate, tortured Heathcliff and gentle, well-bred Edgar Linton, surrendered to the expectations of her class. As Heathcliff's bitterness and vengeance at his betrayal is visited upon the next generation, their innocent heirs must struggle to escape the legacy of the past.  In this edition, a new preface by Lucasta Miller, author of The Brontë Myth, looks at the ways in which the novel has been interpreted, from Charlotte Brontë onwards. This complements Pauline Nestor's introduction, which discusses changing critical receptions of the novel, as well as Emily Brontë's influences and background.",
                "Een van de klassieke meesterwerken van de Engelse literatuur - een meeslepende roman over liefde, fatsoen en tragedie. Genomineerd als een van Amerika's meest geliefde romans door PBS's The Great American Read Emily Brontë's enige roman die standhoudt als een werk van enorme en verreikende invloed. De Penguin Classics-editie is de definitieve versie van de tekst, bewerkt met een inleiding door Pauline Nestor. Lockwood, de nieuwe huurder van Thrushcross Grange, gelegen op de sombere Yorkshire heidevelden, wordt gedwongen om op een nacht onderdak te zoeken in Wuthering Heights, het huis van zijn huisbaas. Daar ontdekt hij de geschiedenis van de stormachtige gebeurtenissen die jaren eerder plaatsvonden. Wat zich ontvouwt, is het verhaal van de intense liefde tussen de zigeunerin vondeling Heathcliff en Catherine Earnshaw. Catherine, gedwongen om te kiezen tussen de gepassioneerde, gekwelde Heathcliff en de zachtaardige, welopgevoede Edgar Linton, gaf zich over aan de verwachtingen van haar klasse. Terwijl Heathcliffs bitterheid en wraak over zijn verraad Wanneer de volgende generatie wordt getroffen, moeten hun onschuldige erfgenamen vechten om te ontsnappen aan de erfenis van het verleden. In deze editie onderzoekt een nieuw voorwoord van Lucasta Miller, auteur van De Brontë-mythe, de manieren waarop de roman is geïnterpreteerd, vanaf Charlotte Brontë tot nu. Dit vormt een aanvulling op de inleiding van Pauline Nestor, die de veranderende kritische ontvangst van de roman bespreekt, evenals de invloeden en achtergrond van Emily Brontë.",
                "https://books.google.com/books/publisher/content?id=vQMyEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70yAOeoQUK5q3PwCaFqQn36ksSAcaxdv0j1BLDPoiotiAc0byjYwlvogkLek-_19Y0a4j4acT-W_kUmOQKZUWwqGYYD5cIv3d9rVy5Fisc_jET7BK--VO9ihoggNFum_K-nWwaT&source=gbs_api",
                LocalDate.parse("2002-12-31"),
                "English",
                416,
                Set.of("paperback"),
                Set.of(author3),
                Set.of(historical, classics, fiction, social_themes),
                publisher0,
                true);

        Product product3 = new Product(
                "The Stranger",
                BigDecimal.valueOf(35.43),
                64,
                "9780679720201",
                "With the intrigue of a psychological thriller, The Stranger—Camus's masterpiece—gives us the story of an ordinary man unwittingly drawn into a senseless murder on an Algerian beach. With an Introduction by Peter Dunwoodie; translated by Matthew Ward.Behind the subterfuge, Camus explores what he termed 'the nakedness of man faced with the absurd' and describes the condition of reckless alienation and spiritual exhaustion that characterized so much of twentieth-century life. 'The Stranger is a strikingly modern text and Matthew Ward’s translation will enable readers to appreciate why Camus’s stoical anti-hero and ­devious narrator remains one of the key expressions of a postwar Western malaise, and one of the cleverest exponents of a literature of ambiguity.” —from the Introduction by Peter DunwoodieFirst published in 1946; now in translation by Matthew Ward.",
                "Met de intrige van een psychologische thriller geeft The Stranger—Camus' meesterwerk—ons het verhaal van een gewone man die onbewust wordt meegesleurd in een zinloze moord op een Algerijns strand. Met een inleiding van Peter Dunwoodie; vertaald door Matthew Ward. Achter de list verkent Camus wat hij 'de naaktheid van de mens geconfronteerd met het absurde' noemde en beschrijft hij de toestand van roekeloze vervreemding en spirituele uitputting die zo veel van het leven in de twintigste eeuw kenmerkte. 'The Stranger is een opvallend moderne tekst en de vertaling van Matthew Ward zal lezers in staat stellen te begrijpen waarom Camus' stoïcijnse antiheld en sluwe verteller een van de belangrijkste uitingen blijft van een naoorlogse westerse malaise, en een van de slimste exponenten van een literatuur van ambiguïteit.' —uit de inleiding van Peter DunwoodieVoor het eerst gepubliceerd in 1946; nu vertaald door Matthew Ward.",
                "https://books.google.com/books/content?id=iVV7bKVUNBAC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72kjlEVV8RtaWaFiWfx4C1iaDGiPkbtnlJF2NpuuAXPdfj06DxvipPBNVB6Whqpjz9ZxbNcGdqn_mi3-0IRq26-ZJeFZV_yAuurQuJkNwE3UiiYsVPO8l_2Sy9-jSvcqiZ0iBFB&source=gbs_api",
                LocalDate.parse("1989-03-13"),
                "English",
                144,
                Set.of("paperback"),
                Set.of(author4),
                Set.of(historical, classics, fiction),
                publisher3,
                true);

        Product product4 = new Product(
                "Fourth Wing",
                BigDecimal.valueOf(39.25),
                69,
                "9780349437019",
                "Twenty-year-old Violet Sorrengail would enter the Scribe Quadrant and live a quiet life surrounded by books and history. Now, the Commanding General—aka her tough mother—has ordered Violet to join the hundreds of hopefuls striving to become Navarre’s elite: Dragon Riders. But when you’re smaller than everyone else and your body is fragile, death is but a heartbeat away… because dragons don’t bond with “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to increase their own chances of success. The rest would kill her simply because she is her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. It will take all of her wits to see the next sunrise. But with each passing day, the war outside grows deadlier, the kingdom’s defenses fail, and the death toll continues to rise. Worse still, Violet begins to suspect that the leadership is hiding a terrible secret. Friends, enemies, lovers. Everyone at Basgiath War College has an agenda – because once you’re there, there are only two ways out: graduate or die.",
                "De twintigjarige Violet Sorrengail zou het Scribe Quadrant betreden en een rustig leven leiden te midden van boeken en geschiedenis. Nu heeft de bevelvoerende generaal – ook bekend als haar taaie moeder – Violet bevolen zich aan te sluiten bij de honderden kandidaten die ernaar streven de elite van Navarra te worden: drakenrijders. Maar als je kleiner bent dan alle anderen en je lichaam broos is, is de dood slechts een hartslag verwijderd... omdat draken zich niet binden aan 'kwetsbare' mensen. Ze verbranden hen. Met minder draken die bereid zijn zich te binden dan cadetten, zouden de meesten Violet doden om hun eigen kansen op succes te vergroten. De rest zou haar doden, puur omdat ze de dochter van haar moeder is – zoals Xaden Riorson, de machtigste en meest meedogenloze wingleader in het Riders Quadrant. Ze zal al haar verstand nodig hebben om de volgende zonsopgang te zien. Maar met elke dag die verstrijkt, wordt de oorlog buiten dodelijker, falen de beschermende maatregelen van het koninkrijk en blijft het dodental stijgen. Erger nog, Violet begint te vermoeden dat de leiding een vreselijk geheim verbergt. Vrienden, vijanden, geliefden. Iedereen op Basgiath War College heeft een agenda – want als je er eenmaal bent, zijn er maar twee uitwegen: afstuderen of sterven.",
                "https://books.google.com/books/content?id=BjqTzwEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71yR7MBMi6p4pTiUAruRgDOqrMrb5vP7oZ7pAqzHnwlHnfWfmiSN5eRI9Bs6IAqKR7P6vg3T41eV26HL9-NVhNOk5SY_HN3SUwSxrEKVRF10H5ipuaUPr_UpEPAcgsCGRHgiU1r&source=gbs_api",
                LocalDate.parse("2024-03-26"),
                "English",
                561,
                Set.of("paperback"),
                Set.of(author5),
                Set.of(fantasy, fiction, satire, political),
                publisher4,
                true);

        Product product5 = new Product(
                "Iron Flame",
                BigDecimal.valueOf(22.85),
                49,
                "9780349437033",
                "Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—Violet included. But Threshing was only the first impossible test meant to weed out the weak-willed, the unworthy, and the unlucky. Now the real training begins, and Violet’s already wondering how she’ll get through. It’s not just that it’s grueling and maliciously brutal, or even that it’s designed to stretch the riders’ capacity for pain beyond endurance. It’s the new vice commandant, who’s made it his personal mission to teach Violet exactly how powerless she is–unless she betrays the man she loves. Although Violet’s body might be weaker and frailer than everyone else’s, she still has her wits—and a will of iron. And leadership is forgetting the most important lesson Basgiath has taught her: Dragon riders make their own rules. But a determination to survive won’t be enough this year. Because Violet knows the real secret hidden for centuries at Basgiath War College—and nothing, not even dragon fire, may be enough to save them in the end.",
                "Iedereen verwachtte dat Violet Sorrengail zou sterven in haar eerste jaar aan Basgiath War College – Violet incluis. Maar dorsen was slechts de eerste onmogelijke test, bedoeld om de zwakken, de onwaardigen en de ongelukkigen eruit te filteren. Nu begint de echte training, en Violet vraagt zich al af hoe ze het gaat redden. Het is niet alleen dat het slopend en wreedaardig is, of zelfs dat het ontworpen is om het vermogen van de ruiters om pijn te verdragen tot het uiterste te rekken. Het is de nieuwe vicecommandant, die er zijn persoonlijke missie van heeft gemaakt om Violet precies te leren hoe machteloos ze is – tenzij ze de man verraadt van wie ze houdt. Hoewel Violets lichaam misschien zwakker en brozer is dan dat van alle anderen, heeft ze nog steeds haar verstand – en een ijzeren wil. En leiderschap is de belangrijkste les vergeten die Basgiath haar heeft geleerd: Drakenrijders maken hun eigen regels. Maar vastberadenheid om te overleven zal dit jaar niet genoeg zijn. Omdat Violet het echte geheim kent dat al eeuwenlang verborgen ligt op Basgiath War College, en niets, zelfs drakenvuur niet, kan hen uiteindelijk redden.",
                "https://books.google.com/books/content?id=9iFB0QEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70zG9SvkaeYjdGlxqtd2UcrAIAhV31cLDCzGmkLFFwzAqGEAoTxmWgjp61u2_o86HBJLG5TTm0nL8-0zyhEB14BCarNiKcFwlyshKQUgI_SvvjTUqYWZK7XJ5LknxekO67T7ryt&source=gbs_api",
                LocalDate.parse("2023-10-31"),
                "English",
                623,
                Set.of("paperback"),
                Set.of(author5),
                Set.of(scifi, romance, thriller, fantasy, fiction, general),
                publisher4,
                true);

        Product product6 = new Product(
                "Throne of Glass",
                BigDecimal.valueOf(29.36),
                69,
                "9781619630345",
                "In a land without magic, where the king rules with an iron hand, an assassin is summoned to the castle. She comes not to kill the king, but to win her freedom. If she defeats twenty-three killers, thieves, and warriors in a competition, she is released from prison to serve as the king's champion. Her name is Celaena Sardothien. The Crown Prince will provoke her. The Captain of the Guard will protect her. But something evil dwells in the castle of glass--and it's there to kill. When her competitors start dying one by one, Celaena's fight for freedom becomes a fight for survival, and a desperate quest to root out the evil before it destroys her world.",
                "In een land zonder magie, waar de koning met ijzeren hand regeert, wordt een huurmoordenaar naar het kasteel geroepen. Ze komt niet om de koning te doden, maar om haar vrijheid te winnen. Als ze drieëntwintig moordenaars, dieven en krijgers verslaat in een wedstrijd, wordt ze vrijgelaten uit de gevangenis om als kampioen van de koning te dienen. Haar naam is Celaena Sardothien. De kroonprins zal haar provoceren. De kapitein van de wacht zal haar beschermen. Maar er huist iets kwaadaardigs in het glazen kasteel – en het is er om te doden. Wanneer haar concurrenten één voor één beginnen te sterven, verandert Celaena's strijd voor vrijheid in een strijd om te overleven, en een wanhopige poging om het kwaad uit te roeien voordat het haar wereld vernietigt.",
                "https://books.google.com/books/content?id=r_i4_Lr5fA4C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70UM1ujJgFvyzUMZSNtzwjVaVlG97FvL0Ax_RTJxqy5J6MQ1xz8zgxuYRUW0Xw-JaejpdQaHE7UEmKTYmySBdn4OmLso9NcJY-x3eucSAtVhvRCx-EzAlN-PRcyWgzKKZTiFyIV&source=gbs_api",
                LocalDate.parse("2013-05-07"),
                "English",
                432,
                Set.of("paperback"),
                Set.of(author7),
                Set.of(political, romance, satire, thriller, fantasy),
                publisher6,
                true);

        Product product7 = new Product(
                "Queen of Ruin",
                BigDecimal.valueOf(38.98),
                28,
                "9780316471473",
                "A fierce sequel full of sisterhood, heart-pounding action, betrayal, and royal intrigue, perfect for fans of The Belles and Caraval.When the new, brutal Superior banishes Nomi from Bellaqua, she finds herself powerless and headed towards her all-but-certain death. Her only hope is to find her sister, Serina, on the prison island of Mount Ruin. But when Nomi arrives, it is not the island of conquered, broken women that they expected. It is an island in the grip of revolution, and Serina -- polite, submissive Serina -- is its leader.Betrayal, grief, and violence have changed both sisters, and the women of Mount Ruin have their sights set on revenge beyond the confines of their island prison. They plan to sweep across the entire kingdom, issuing in a new age of freedom for all. But first they'll have to get rid of the new Superior, and only Nomi knows how.Separated once again, this time by choice, Nomi and Serina must forge their own paths as they aim to tear down the world they know, and build something better in its place.The stakes are higher and the battles bolder in Tracy Banghart's unputdownable sequel to Grace and Fury.",
                "Een heftig vervolg vol zusterschap, bloedstollende actie, verraad en koninklijke intriges, perfect voor fans van The Belles en Caraval. Wanneer de nieuwe, brute Superior Nomi uit Bellaqua verbannen heeft, is ze machteloos en stevent ze af op haar vrijwel zekere dood. Haar enige hoop is haar zus Serina te vinden op het gevangeniseiland Mount Ruin. Maar wanneer Nomi arriveert, is het niet het eiland van veroverde, gebroken vrouwen dat ze verwachtten. Het is een eiland in de greep van een revolutie, en Serina – de beleefde, onderdanige Serina – is de leider. Verraad, verdriet en geweld hebben beide zussen veranderd, en de vrouwen van Mount Ruin hebben hun zinnen gezet op wraak buiten de grenzen van hun eilandgevangenis. Ze zijn van plan het hele koninkrijk te doorkruisen en een nieuw tijdperk van vrijheid voor iedereen in te luiden. Maar eerst moeten ze zich ontdoen van de nieuwe Superior, en alleen Nomi weet hoe. Opnieuw gescheiden, dit keer uit vrije wil, moeten Nomi en Serina hun eigen paden vinden terwijl ze hebben als doel de wereld die ze kennen af ​​te breken en er iets beters voor in de plaats te bouwen. De inzet is hoger en de gevechten gewaagder in Tracy Bangharts onweerstaanbare vervolg op Grace and Fury.",
                "https://books.google.com/books/content?id=wQR3ygEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73eog1Zi0zyKDvyF28Z0u1-QtgFNbAS3oNA24kywhteXV6_dyv5Abjj3fxLCmsziixRbN6zSlCTyUyoaTkx9dq2H_tSk-dGGFZNowvcmg6BYUC8COlcDfCL3KizMAxjNijfeMGf&source=gbs_api",
                LocalDate.parse("2020-06-02"),
                "English",
                336,
                Set.of("paperback"),
                Set.of(author8),
                Set.of(political, romance, thriller, scifi, fantasy, general),
                publisher7,
                true);

        Product product8 = new Product(
                "Annual 2015",
                BigDecimal.valueOf(35.87),
                51,
                "9781408331330",
                "Discover a year of magical pony fun with the official My Little Pony Annual 2015. This super-sparkly book is packed with games, stories, activities, recipes and lots more to keep little ones entertained. With lots of things to make and do and over 200 pretty stickers, this is the perfect gift for any My Little Pony fan.",
                "Ontdek een jaar vol magisch ponyplezier met het officiële My Little Pony Jaarboek 2015. Dit superglimmende boek staat boordevol spelletjes, verhalen, activiteiten, recepten en nog veel meer om de kleintjes te vermaken. Met talloze knutsel- en doe-dingetjes en meer dan 200 mooie stickers is dit het perfecte cadeau voor elke My Little Pony-fan.",
                "https://books.google.com/books/content?id=YXcKngEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73v94fAVcbngRC4dkRzH6c7NxeH6pmpwkkE_eboG-L4WQDrQz8pPsQXH_LKgyRg8U_ANX7VRykpk8GCLu_YrI21dwDzDtV4n15655td27rD3RHizH9XT68-Lad-g4iYbYmAIHfJ&source=gbs_api",
                LocalDate.parse("2014-08-07"),
                "English",
                64,
                Set.of("paperback"),
                Set.of(author9, author10),
                Set.of(satire, fantasy, fiction, classics, paranormal),
                publisher8,
                true);

        Product product9 = new Product(
                "The Women",
                BigDecimal.valueOf(28.06),
                55,
                "9781250178633",
                "Women can be heroes. When twenty-year-old nursing student Frances 'Frankie' McGrath hears these words, it is a revelation. Raised in the sun-drenched, idyllic world of Southern California and sheltered by her conservative parents, she has always prided herself on doing the right thing. But in 1965, the world is changing, and she suddenly dares to imagine a different future for herself. When her brother ships out to serve in Vietnam, she joins the Army Nurse Corps and follows his path. As green and inexperienced as the men sent to Vietnam to fight, Frankie is over-whelmed by the chaos and destruction of war. Each day is a gamble of life and death, hope and betrayal; friendships run deep and can be shattered in an instant. In war, she meets—and becomes one of—the lucky, the brave, the broken, and the lost. But war is just the beginning for Frankie and her veteran friends. The real battle lies in coming home to a changed and divided America, to angry protesters, and to a country that wants to forget Vietnam. The Women is the story of one woman gone to war, but it shines a light on all women who put themselves in harm's way and whose sacrifice and commitment to their country has too often been forgotten. A novel about deep friendships and bold patriotism, The Women is a richly drawn story with a memorable heroine whose idealism and courage under fire will come to define an era.",
                "Vrouwen kunnen helden zijn. Wanneer de twintigjarige verpleegkundestudente Frances 'Frankie' McGrath deze woorden hoort, is het een openbaring. Opgegroeid in de zonovergoten, idyllische wereld van Zuid-Californië en beschut door haar conservatieve ouders, heeft ze er altijd trots op geweest het juiste te doen. Maar in 1965 verandert de wereld en durft ze zich plotseling een andere toekomst voor te stellen. Wanneer haar broer naar Vietnam wordt gestuurd om te dienen, sluit ze zich aan bij het Army Nurse Corps en volgt ze zijn pad. Net zo groen en onervaren als de mannen die naar Vietnam worden gestuurd om te vechten, wordt Frankie overweldigd door de chaos en verwoesting van de oorlog. Elke dag is een gok op leven en dood, hoop en verraad; vriendschappen zijn diepgeworteld en kunnen in een oogwenk kapotgaan. In de oorlog ontmoet ze – en wordt ze een van – de gelukkigen, de dapperen, de gebrokenen en de verlorenen. Maar oorlog is slechts het begin voor Frankie en haar veteranenvrienden. De echte strijd ligt in de terugkeer naar een veranderd en verdeeld Amerika, naar woedende demonstranten en naar een land dat Vietnam wil vergeten. The Women is het verhaal van één vrouw die naar de oorlog is gegaan, maar het werpt een licht op alle vrouwen die zichzelf in gevaar brengen en wier opoffering en toewijding aan hun land te vaak vergeten zijn. The Women, een roman over diepe vriendschappen en gedurfd patriottisme, is een rijk getekend verhaal met een memorabele heldin wiens idealisme en moed onder vuur een tijdperk zullen bepalen.",
                "https://books.google.com/books/publisher/content?id=ALG9EAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73q_0I-F2P8nG2Oem95Ez089J2KB-oK37h_Q1w4qNeSAq4LdZu13Qf432EPvF7VQCZzroZpxRg-JLg1ldm-ofK0q020tE_cS8jiPWxSt_kbb-YCqTRCJUihr8EbO1fNUWTYGcLJ&source=gbs_api",
                LocalDate.parse("2024-02-06"),
                "English",
                480,
                Set.of("paperback"),
                Set.of(author11),
                Set.of(satire, political, fantasy, fiction, general, romance),
                publisher9,
                true);


        Product product10 = new Product(
                "None of This Is True",
                BigDecimal.valueOf(26.63),
                70,
                "9781982179007",
                "INSTANT NEW YORK TIMES BESTSELLER Over 1 million copies sold!  From the #1 New York Times bestselling author known for her “superb pacing, twisted characters, and captivating prose” (BuzzFeed), Lisa Jewell returns with a scintillating new psychological thriller about a woman who finds herself the subject of her own popular true crime podcast.Celebrating her forty-fifth birthday at her local pub, popular podcaster Alix Summer crosses paths with an unassuming woman called Josie Fair. Josie, it turns out, is also celebrating her forty-fifth birthday. They are, in fact, birthday twins. A few days later, Alix and Josie bump into each other again, this time outside Alix’s children’s school. Josie has been listening to Alix’s podcasts and thinks she might be an interesting subject for her series. She is, she tells Alix, on the cusp of great changes in her life. Josie’s life appears to be strange and complicated, and although Alix finds her unsettling, she can’t quite resist the temptation to keep making the podcast. Slowly she starts to realize that Josie has been hiding some very dark secrets, and before she knows it, Josie has inveigled her way into Alix’s life—and into her home. But, as quickly as she arrived, Josie disappears. Only then does Alix discover that Josie has left a terrible and terrifying legacy in her wake, and that Alix has become the subject of her own true crime podcast, with her life and her family’s lives under mortal threat. Who is Josie Fair? And what has she done?",
                "DIRECTE NEW YORK TIMES BESTSELLER Meer dan 1 miljoen exemplaren verkocht! Van de #1 New York Times bestsellerauteur, bekend om haar 'superieure tempo, verdraaide personages en boeiende proza' (BuzzFeed), keert Lisa Jewell terug met een schitterende nieuwe psychologische thriller over een vrouw die het onderwerp is van haar eigen populaire true crime-podcast. Terwijl ze haar vijfenveertigste verjaardag viert in haar lokale kroeg, kruist de populaire podcaster Alix Summer het pad van een bescheiden vrouw genaamd Josie Fair. Josie, zo blijkt, viert ook haar vijfenveertigste verjaardag. Ze zijn namelijk een jarige tweeling. Een paar dagen later komen Alix en Josie elkaar weer tegen, dit keer buiten de school van Alix' kinderen. Josie heeft naar Alix' podcasts geluisterd en denkt dat ze een interessant onderwerp zou kunnen zijn voor haar serie. Ze staat, vertelt ze Alix, op het punt van grote veranderingen in haar leven. Josie's leven lijkt vreemd en ingewikkeld, en hoewel Alix vindt haar verontrustend en kan de verleiding niet weerstaan ​​om de podcast te blijven maken. Langzaam begint ze te beseffen dat Josie een aantal zeer duistere geheimen verbergt, en voor ze het weet, heeft Josie zich een weg gebaand naar Alix' leven – en naar haar huis. Maar net zo snel als ze is aangekomen, verdwijnt Josie. Pas dan ontdekt Alix dat Josie een vreselijke en angstaanjagende erfenis heeft achtergelaten, en dat Alix het onderwerp is geworden van haar eigen true crime-podcast, waarbij haar leven en dat van haar familie met de dood worden bedreigd. Wie is Josie Fair? En wat heeft ze gedaan?",
                "https://books.google.com/books/publisher/content?id=1x2IEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE720Ohsfr91yn6mqS1OH6_1dggWno_YvgYVmwP5csP1P2-7GqCEDfGrQkCyVI-v4HFvc0I9HdwV9lRiOO4UdMYCGzxykuuAbRhHhaHu0I-fKn5cbvcExRwNJJU2_rEmDA9mbT10p&source=gbs_api",
                LocalDate.parse("2023-08-08"),
                "English",
                384,
                Set.of("paperback"),
                Set.of(author12),
                Set.of(scifi, fiction, general, fantasy, thriller, paranormal),
                publisher11,
                true);

        Product product11 = new Product(
                "Tom Lake",
                BigDecimal.valueOf(27.16),
                74,
                "9780063327528",
                "#1 NEW YORK TIMES BESTSELLER * A REESE'S BOOK CLUB PICK In this beautiful and moving novel about family, love, and growing up, Ann Patchett once again proves herself one of America's finest writers. 'Patchett leads us to a truth that feels like life rather than literature.' --The Guardian In the spring of 2020, Lara's three daughters return to the family's orchard in Northern Michigan. While picking cherries, they beg their mother to tell them the story of Peter Duke, a famous actor with whom she shared both a stage and a romance years before at a theater company called Tom Lake. As Lara recalls the past, her daughters examine their own lives and relationship with their mother, and are forced to reconsider the world and everything they thought they knew. Tom Lake is a meditation on youthful love, married love, and the lives parents have led before their children were born. Both hopeful and elegiac, it explores what it means to be happy even when the world is falling apart. As in all of her novels, Ann Patchett combines compelling narrative artistry with piercing insights into family dynamics. The result is a rich and luminous story, told with profound intelligence and emotional subtlety, that demonstrates once again why she is one of the most revered and acclaimed literary talents working today.",
                "#1 NEW YORK TIMES BESTSELLER * EEN KEUZE VAN REESE'S BOOK CLUB In deze prachtige en ontroerende roman over familie, liefde en opgroeien, bewijst Ann Patchett opnieuw dat ze een van de beste Amerikaanse schrijvers is. 'Patchett leidt ons naar een waarheid die meer aanvoelt als het leven zelf dan als literatuur.' --The Guardian In het voorjaar van 2020 keren Lara's drie dochters terug naar de boomgaard van het gezin in Noord-Michigan. Terwijl ze kersen plukken, smeken ze hun moeder om hen het verhaal te vertellen van Peter Duke, een beroemde acteur met wie ze jaren geleden zowel een podium als een romance deelde bij een theatergezelschap genaamd Tom Lake. Terwijl Lara terugdenkt aan het verleden, onderzoeken haar dochters hun eigen leven en de relatie met hun moeder en worden ze gedwongen de wereld en alles wat ze dachten te weten te heroverwegen. Tom Lake is een meditatie over jeugdige liefde, huwelijksliefde en het leven dat ouders hebben geleid voordat hun kinderen geboren werden. Zowel hoopvol als melancholisch, onderzoekt het wat het betekent om gelukkig te zijn, zelfs als de wereld uit elkaar valt. Zoals in al haar romans combineert Ann Patchett meeslepende vertelkunst met scherpe inzichten in familiedynamiek. Het resultaat is een rijk en helder verhaal, verteld met diepgaande intelligentie en emotionele subtiliteit, dat opnieuw aantoont waarom ze een van de meest gerespecteerde en geprezen literaire talenten van dit moment is.",
                "https://books.google.com/books/content?id=9R-AzwEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE721IO1pWvDFuZ6KKzPQUu-i0mrsOFBmDjWjz8xL-9ATAYKhC9LFXPWLDnqpQAXj5geZbYjcT0OxTxif5Ba6Ywv-ENOpWw6meR9-kk0vhLKsQWGSbrTKVi21RHwh-VgVxDu_kgyN&source=gbs_api",
                LocalDate.parse("2023-01-01"),
                "English",
                309,
                Set.of("paperback"),
                Set.of(author13),
                Set.of(satire, political, classics, thriller, fantasy, fiction, paranormal, historical, romance),
                publisher12,
                true);

        Product product12 = new Product(
                "Happy Place",
                BigDecimal.valueOf(34.28),
                15,
                "9780593441275",
                "Happy Place revolves around the lives of Harriet Kilpatrick and Wyn Connor, who have been in a committed relationship for eight years. They have separated but chose to keep it a secret from their friends. Every year, they go on a retreat to a beautiful cottage in Maine, which they call their 'happy place'. During their stay, they try to pretend that they are still very much together and in love, but it becomes increasingly difficult to keep up the act. The book explores love, loss, and the complexities of relationships. Harriet is a young surgical resident who is exhausted and unsure about her future in medicine. Meanwhile, Wyn is facing personal struggles and navigating significant career changes. The story examines their bond and the challenges they face as they try to navigate their complex feelings and the dynamics of their friend group. The narrative moves back and forth in time, showing how their relationship began in college and evolved over time, with various ups and downs, including distance, misunderstandings, and personal growth.",
                "Happy Place draait om de levens van Harriet Kilpatrick en Wyn Connor, die al acht jaar een vaste relatie hebben. Ze zijn uit elkaar, maar hebben ervoor gekozen dit geheim te houden voor hun vrienden. Elk jaar gaan ze op retraite naar een prachtig huisje in Maine, dat ze hun 'happy place' noemen. Tijdens hun verblijf proberen ze te doen alsof ze nog steeds heel erg samen zijn en verliefd, maar het wordt steeds moeilijker om de schijn op te houden. Het boek onderzoekt liefde, verlies en de complexiteit van relaties. Harriet is een jonge chirurg in opleiding die uitgeput en onzeker is over haar toekomst in de geneeskunde. Ondertussen kampt Wyn met persoonlijke problemen en maakt ze ingrijpende carrièreswitches. Het verhaal onderzoekt hun band en de uitdagingen waarmee ze worden geconfronteerd terwijl ze proberen hun complexe gevoelens en de dynamiek binnen hun vriendengroep te navigeren. Het verhaal beweegt heen en weer in de tijd en laat zien hoe hun relatie begon op de universiteit en zich in de loop der tijd ontwikkelde, met verschillende ups en downs, waaronder afstand, misverstanden en persoonlijke groei.",
                "https://books.google.com/books/publisher/content?id=VY6OEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yJKbNXkYIGHlOQhBfdWlXnoI54snwUGQZopZhgCnXKxiFHdVNs0UgfR1sxSOQx2A9ISS-KLvHvzfvps4giGUQF2hcKT4C-Tvd3L262sn6ushQ0ZYFO7ApN3C5YEZWD8v_tTPn&source=gbs_api",
                LocalDate.parse("2023-04-25"),
                "English",
                400,
                Set.of("paperback"),
                Set.of(author14),
                Set.of(thriller, fiction, political, paranormal, fantasy),
                publisher0,
                true);

        Product product13 = new Product(
                "The Heaven & Earth Grocery Store",
                BigDecimal.valueOf(28.87),
                57,
                "9780593422946",
                "The book opens in 1972, in the town of Pottstown, Pennsylvania, where an excavation operation for a new housing complex inadvertently discovers a skeleton in the bottom of a well. Some items are found near the body, including a mezuza, which leads policeman to question the town's only Jewish resident, Malachi, who is living in a disused synagogue. But the investigation is hampered when the crime scene is washed away by Hurricane Agnes. The novel then goes back to 1920s and '30s Pottstown and details the lives of the town's residents in the mostly Black and Jewish Chicken Hill neighborhood. Two of the Jewish residents, husband and wife Moshe and Chona Ludlow, own a local theater with a dance hall and a grocery store (The Heaven & Earth Grocery Store). One of the town's Black residents (who works for the Ludlows), Nate Timblin, asks the Ludlows to hide a young Black boy who is deaf, named Dodo, from the authorities who are seeking to institutionalize him in the Pennhurst State School and Hospital, a notorious mental asylum. The town's physician, also a member of the Ku Klux Klan, has racist and xenophobic motives and is favored by many of the white residents of the town in such policies. The Black and Jewish townspeople eventually mobilize to help the boy.",
                "Het boek begint in 1972 in Pottstown, Pennsylvania, waar bij een opgraving voor een nieuw woningbouwcomplex per ongeluk een skelet op de bodem van een waterput wordt ontdekt. ​​Er worden enkele voorwerpen in de buurt van het lichaam gevonden, waaronder een mezoeza, wat ertoe leidt dat de politie de enige Joodse inwoner van de stad, Malachi, ondervraagt. Hij woont in een verlaten synagoge. Maar het onderzoek wordt bemoeilijkt wanneer de plaats delict wordt weggespoeld door orkaan Agnes. De roman keert vervolgens terug naar Pottstown in de jaren 20 en 30 en beschrijft het leven van de inwoners van de stad in de overwegend zwarte en Joodse wijk Chicken Hill. Twee van de Joodse inwoners, het echtpaar Moshe en Chona Ludlow, zijn eigenaar van een lokaal theater met een danszaal en een supermarkt (The Heaven & Earth Grocery Store). Een van de zwarte inwoners van de stad (die voor de Ludlows werkt), Nate Timblin, vraagt ​​de Ludlows om een ​​jonge, dove zwarte jongen, Dodo genaamd, te verbergen voor de autoriteiten die hem willen laten opnemen in de Pennhurst State School and Hospital, een beruchte psychiatrische inrichting. De arts van de stad, tevens lid van de Ku Klux Klan, heeft racistische en xenofobe motieven en wordt door veel blanke inwoners van de stad gesteund in dit beleid. De zwarte en joodse inwoners komen uiteindelijk in actie om de jongen te helpen.",
                "https://books.google.com/books/publisher/content?id=ieOgEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70ulNCXJW2BCy0qIh1wIgK7stlRuu9_sWXKwCLXygOGpPrGKSMywIWcjn7DTxI-khxtXnQ_GS1KiKLXGrhKLMEtTJRlQAF-qJApOH7Ui-fnhkp2q94cgHuJRUhRIrWmpEEvT9Lp&source=gbs_api",
                LocalDate.parse("2023-08-08"),
                "English",
                400,
                Set.of("paperback"),
                Set.of(author15),
                Set.of(satire, political, fantasy, fiction, historical),
                publisher0,
                true);

        Product product14 = new Product(
                "Remarkably Bright Creatures",
                BigDecimal.valueOf(32.63),
                11,
                "9780063204157",
                "AN INSTANT NEW YORK TIMES BESTSELLER Soon to be a Netflix Film A Read With Jenna Today Show Book Club Pick! NAMED A BEST BOOK OF SUMMER by: Chicago Tribune * The View * Southern Living * USA Today 'Remarkably Bright Creatures [is] an ultimately feel-good but deceptively sensitive debut. . . . Memorable and tender.' -- Washington Post  For fans of A Man Called Ove, a charming, witty and compulsively readable exploration of friendship, reckoning, and hope that traces a widow's unlikely connection with a giant Pacific octopus After Tova Sullivan's husband died, she began working the night shift at the Sowell Bay Aquarium, mopping floors and tidying up. Keeping busy has always helped her cope, which she's been doing since her eighteen-year-old son, Erik, mysteriously vanished on a boat in Puget Sound over thirty years ago. Tova becomes acquainted with curmudgeonly Marcellus, a giant Pacific octopus living at the aquarium. Marcellus knows more than anyone can imagine but wouldn't dream of lifting one of his eight arms for his human captors--until he forms a remarkable friendship with Tova. Ever the detective, Marcellus deduces what happened the night Tova's son disappeared. And now Marcellus must use every trick his old invertebrate body can muster to unearth the truth for her before it's too late.  Shelby Van Pelt's debut novel is a gentle reminder that sometimes taking a hard look at the past can help uncover a future that once felt impossible.",
                "EEN DIRECTE NEW YORK TIMES-BESTSELLER, binnenkort een Netflix-film. Lees mee met Jenna. Keuze van de Today Show Book Club! UITGENODIGD ALS HET BESTE BOEK VAN DE ZOMER door: Chicago Tribune * The View * Southern Living * USA Today 'Remarkably Bright Creatures [is] een uiteindelijk feelgood, maar misleidend gevoelig debuut. . . . Onvergetelijk en ontroerend.' -- Washington Post Voor fans van Een man die Ove heet, een charmante, geestige en meeslepend leesbare verkenning van vriendschap, afrekening en hoop die de onwaarschijnlijke connectie van een weduwe met een gigantische Pacifische octopus schetst. Nadat Tova Sullivans echtgenoot stierf, begon ze de nachtdienst te draaien in het Sowell Bay Aquarium, vloeren dweilen en opruimen. Bezig blijven heeft haar altijd geholpen ermee om te gaan, wat ze doet sinds haar achttienjarige zoon, Erik, meer dan dertig jaar geleden op mysterieuze wijze verdween op een boot in Puget Sound. Tova maakt kennis met de knorrige Marcellus, een gigantische Pacifische octopus die in het aquarium leeft. Marcellus weet meer dan iemand zich kan voorstellen, maar zou er niet aan denken om een ​​van zijn acht armen op te tillen voor zijn menselijke ontvoerders - totdat hij een opmerkelijke vriendschap met Tova sluit. Altijd de detective, leidt Marcellus af wat er gebeurde in de nacht dat Tova's zoon verdween. En nu moet Marcellus elke truc gebruiken die zijn oude ongewervelde lichaam kan bedenken om de waarheid voor haar te onthullen voordat het te laat is. De debuutroman van Shelby Van Pelt is een zachte herinnering dat je soms door kritisch naar het verleden te kijken een toekomst kunt ontdekken die ooit onmogelijk leek.",
                "https://books.google.com/books/content?id=rKqWzgEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70dwBQsDb7dqTMZcGscr7nyljk1rure_48MgIx_-7uDIpfEcvrItjvDiCJfTinYFYA1ANOras53B1jCj3M8aCOJhgD8sB7ls6LrZidyA3uRUadrXTRqsCBdCR1DGvhWUlaIKDLO&source=gbs_api",
                LocalDate.parse("2022-01-01"),
                "English",
                360,
                Set.of("paperback"),
                Set.of(author16),
                Set.of(general, thriller, paranormal, scifi, fiction, romance, fantasy, satire, classics, historical),
                publisher13,
                true);

        Product product15 = new Product(
                "Twilight",
                BigDecimal.valueOf(19.41),
                63,
                "9780316015844",
                "With 160 million copies of the Twilight Saga sold worldwide, this addictive love story between a teenage girl and a vampire redefined romance for a generation. Here's the book that started it all.Isabella Swan's move to Forks, a small, perpetually rainy town in Washington, could have been the most boring move she ever made. But once she meets the mysterious and alluring Edward Cullen, Isabella's life takes a thrilling and terrifying turn.Up until now, Edward has managed to keep his vampire identity a secret in the small community he lives in, but now nobody is safe, especially Isabella, the person Edward holds most dear. The lovers find themselves balanced precariously on the point of a knife-between desire and danger.Deeply romantic and extraordinarily suspenseful, Twilightcaptures the struggle between defying our instincts and satisfying our desires. This is a love story with bite.'People do not want to just read Meyer's books; they want to climb inside them and live there.'-Time'A literary phenomenon.'-The New York Times",
                "Met wereldwijd 160 miljoen verkochte exemplaren van de Twilight Saga, heeft dit verslavende liefdesverhaal tussen een tienermeisje en een vampier de romantiek voor een generatie lang herdefinieerd. Dit is het boek waarmee het allemaal begon. Isabella Swans verhuizing naar Forks, een klein, altijd regenachtig stadje in Washington, had de saaiste verhuizing ooit kunnen zijn. Maar zodra ze de mysterieuze en aantrekkelijke Edward Cullen ontmoet, neemt Isabella's leven een spannende en angstaanjagende wending. Tot nu toe is Edward erin geslaagd zijn vampieridentiteit geheim te houden in de kleine gemeenschap waar hij woont, maar nu is niemand meer veilig, vooral Isabella niet, de persoon die Edward het meest dierbaar is. De geliefden bevinden zich in een precaire balans tussen verlangen en gevaar. Diep romantisch en buitengewoon spannend, legt Twilight de strijd vast tussen het trotseren van onze instincten en het bevredigen van onze verlangens. Dit is een liefdesverhaal met pit. Mensen willen Meyers boeken niet alleen lezen; ze willen erin kruipen en leven daar.'-Tijd'Een literair fenomeen.'-The New York Times'",
                "https://www.deslegte.com/images/cached/resample/webp/data/uploads/1184/1800/cms_visual_2303909.jpg_1711632349000_1184x1800_0.8_p-91db884152.webp",
                LocalDate.parse("2006-09-06"),
                "English",
                544,
                Set.of("paperback"),
                Set.of(author17),
                Set.of(political, thriller, general, fantasy, satire, classics, paranormal),
                publisher7,
                true);

        Product product16 = new Product(
                "The Host",
                BigDecimal.valueOf(24.43),
                15,
                "9780316068048",
                "The author of the Twilight series of #1 bestsellers delivers her brilliant first novel for adults: a gripping story of love and betrayal in a future with the fate of humanity at stake.Melanie Stryder refuses to fade away. The earth has been invaded by a species that take over the minds of their human hosts while leaving their bodies intact, and most of humanity has succumbed.Wanderer, the invading 'soul' who has been given Melanie's body, knew about the challenges of living inside a human: the overwhelming emotions, the too vivid memories. But there was one difficulty Wanderer didn't expect: the former tenant of her body refusing to relinquish possession of her mind.Melanie fills Wanderer's thoughts with visions of the man Melanie loves--Jared, a human who still lives in hiding. Unable to separate herself from her body's desires, Wanderer yearns for a man she's never met. As outside forces make Wanderer and Melanie unwilling allies, they set off to search for the man they both love.Featuring what may be the first love triangle involving only two bodies, THE HOST is a riveting and unforgettable novel that will bring a vast new readership to one of the most compelling writers of our time.",
                "De auteur van de Twilight-serie met #1 bestsellers levert haar briljante debuutroman voor volwassenen af: een aangrijpend verhaal over liefde en verraad in een toekomst waarin het lot van de mensheid op het spel staat. Melanie Stryder weigert te verdwijnen. De aarde is binnengevallen door een soort die de geest van hun menselijke gastheren overneemt terwijl hun lichamen intact blijven, en het grootste deel van de mensheid is bezweken. Wanderer, de binnendringende 'ziel' die Melanie's lichaam heeft gekregen, wist van de uitdagingen van het leven in een mens: de overweldigende emoties, de te levendige herinneringen. Maar er was één moeilijkheid die Wanderer niet had verwacht: de voormalige bewoner van haar lichaam die weigert haar geest los te laten. Melanie vult Wanderers gedachten met visioenen van de man die Melanie liefheeft - Jared, een mens die nog steeds ondergedoken leeft. Niet in staat zich los te maken van de verlangens van haar lichaam, verlangt Wanderer naar een man die ze nog nooit heeft ontmoet. Terwijl externe krachten Wanderer en Melanie onwillige bondgenoten maken, gaan ze op pad om zoeken naar de man van wie ze allebei houden. THE HOST, met wellicht de eerste liefdesdriehoek tussen slechts twee lichamen, is een meeslepende en onvergetelijke roman die een enorm nieuw lezerspubliek zal aantrekken voor een van de meest fascinerende schrijvers van onze tijd.",
                "http://books.google.com/books/content?id=h3KoqdZ2jpYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rgp6ISXS2M70KSnfhTRMGeOijQGA2lNTZnY_cFW9QlKYHD37kKFpqGrwQR_NyzcoF4HDIZw2BSfV1-KEzHB6BqqWJ0YLH1N_zRW--FNrCYKvOTYYwN7r8AMVQZ93OqwjNEI8O&source=gbs_api",
                LocalDate.parse("2008-05-06"),
                "English",
                619,
                Set.of("paperback"),
                Set.of(author17),
                Set.of(romance, thriller, fantasy, fiction, general, classics, scifi),
                publisher14,
                true);

        Product product17 = new Product(
                "Looking for Alaska",
                BigDecimal.valueOf(36.99),
                5,
                "9781435249158",
                "Sixteen-year-old Miles' first year at Culver Creek Preparatory School in Alabama includes good friends and great pranks, but is defined by the search for answers about life and death after a fatal car crash. An ALA Best Book for Young Adults & ALA Quick Pick. Reprint.",
                "Het eerste jaar van de zestienjarige Miles op de Culver Creek Preparatory School in Alabama bestaat uit goede vrienden en leuke grappen, maar wordt gekenmerkt door de zoektocht naar antwoorden over leven en dood na een dodelijk auto-ongeluk. Een ALA Best Book for Young Adults & ALA Quick Pick. Herdruk.",
                "http://books.google.com/books/content?id=03q0ngEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72MgWYnGJifno8UprZPge9DILDyLB3yJ5iqNxPizS140FTyZb9Q5qlFG7JtK0-brKfmaVR6qyWGi67T_b-a8coyFo-cKcUgV34eEiprzrSmR8tsnWNk-pN_GsQBvkOIMIA8sHPI&source=gbs_api",
                LocalDate.parse("2007-01-01"),
                "English",
                234,
                Set.of("paperback"),
                Set.of(author18),
                Set.of(thriller, fiction, satire, fantasy, paranormal),
                publisher15,
                true);

        Product product18 = new Product(
                "Uglies",
                BigDecimal.valueOf(35.55),
                60,
                "9780689865381",
                "Everybody gets to be supermodel gorgeous. What could be wrong with that? Tally is about to turn sixteen, and she can't wait. Not for her license -- for turning pretty. In Tally's world, your sixteenth birthday brings an operation that turns you from a repellent ugly into a stunningly attractive pretty and catapults you into a high-tech paradise where your only job is to have a really great time. In just a few weeks Tally will be there. But Tally's new friend Shay isn't sure she wants to be pretty. She'd rather risk life on the outside. When Shay runs away, Tally learns about a whole new side of the pretty world -- and it isn't very pretty. The authorities offer Tally the worst choice she can imagine: find her friend and turn her in, or never turn pretty at all. The choice Tally makes changes her world forever.",
                "Iedereen mag er fantastisch uitzien als een supermodel. Wat is daar mis mee? Tally wordt bijna zestien en ze kan niet wachten. Niet op haar rijbewijs, maar op knap worden. In Tally's wereld brengt je zestiende verjaardag een operatie met zich mee die je van een afstotelijk lelijk mens verandert in een oogverblindend aantrekkelijk knap mens en je katapulteert naar een hightechparadijs waar je enige taak is om een ​​fantastische tijd te hebben. Over een paar weken is Tally er. Maar Tally's nieuwe vriendin Shay weet niet zeker of ze wel knap wil zijn. Ze riskeert liever haar leven buiten de deur. Wanneer Shay wegloopt, leert Tally een compleet nieuwe kant van de mooie wereld kennen – en die is niet bepaald mooi. De autoriteiten bieden Tally de slechtste keuze die ze zich kan voorstellen: haar vriendin vinden en aangeven, of helemaal niet knap worden. De keuze die Tally maakt, verandert haar wereld voorgoed.",
                "http://books.google.com/books/content?id=fnPhAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72BnqfSUw_Aa6w5QMl2CfUTm9qHxQ9BtLFyMSWITxON7-KhELQI-pCHq0BxriEZZNJs6wCfys5Z-bGxPIuKGI7hU7yBSfN1EmkQzh1nDk3NeBKByqqFtF4_D6XXDAQnmz0VOtMv&source=gbs_api",
                LocalDate.parse("2005-02-08"),
                "English",
                425,
                Set.of("paperback"),
                Set.of(author19),
                Set.of(political, romance, fiction, satire, fantasy, general),
                publisher16,
                true);

        Product product19 = new Product(
                "Ella Enchanted",
                BigDecimal.valueOf(16.48),
                72,
                "9780590920681",
                "In this novel based on the story of Cinderella, Ella struggles against the childhood curse that forces her to obey any order given to her. At birth, Ella of Frell was given the gift of obedience by a fairy. Ella soon realizes that this gift is little better than a curse, for how can she truly be herself if at any time anyone can order her to hop on one foot, or cut off her hand, or betray her kingdom--and she'll have to obey? Ella's quest to break the curse and discover who she really is, is both funny and poignant.",
                "In deze roman, gebaseerd op het verhaal van Assepoester, vecht Ella tegen de kindervloek die haar dwingt elk bevel op te volgen. Bij haar geboorte kreeg Ella van Frell de gave van gehoorzaamheid van een fee. Ella beseft al snel dat deze gave weinig meer is dan een vloek, want hoe kan ze echt zichzelf zijn als iemand haar op elk moment kan bevelen om op één voet te hinkelen, of haar hand af te hakken, of haar koninkrijk te verraden – en ze dan moet gehoorzamen? Ella's zoektocht om de vloek te verbreken en te ontdekken wie ze werkelijk is, is zowel grappig als aangrijpend.",
                "http://books.google.com/books/content?id=foUdCStL2J8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70TV3HFgUQzRzYvQttPz-woIKwwDIphSn7CATkeTY-Q3OI4_4tutqzvfEC1WmeD-FcDXk4I6kDzJViT8g2ci0VgKrL-TcCE_nPeA69x6t8PybKkYWBxSWOGfuc79k7N2cN1O2wr&source=gbs_api",
                LocalDate.parse("1997-01-01"),
                "English",
                232,
                Set.of("paperback"),
                Set.of(author20),
                Set.of(satire),
                publisher17,
                true);

        Product product20 = new Product(
                "The Maze Runner",
                BigDecimal.valueOf(26.47),
                6,
                "9780385737944",
                "THE #1 NEW YORK TIMES BESTSELLING MAZE RUNNER SERIES • A teenager with no memory must navigate a deadly maze to survive in book one of this post-apocalyptic phenomenon.“[A] mysterious survival saga that passionate fans describe as a fusion of Lord of the Flies [and] The Hunger Games” (Entertainment Weekly)When Thomas wakes up in the lift, the only thing he can remember is his name. He’s surrounded by strangers—boys whose memories are also gone. Outside the towering stone walls that surround them is a limitless, ever-changing maze. It’s the only way out—and no one’s ever made it through alive.Then a girl arrives. The first girl ever. And the message she delivers is terrifying: Remember. Survive. Run.Look for more books in the blockbuster Maze Runner series:THE MAZE RUNNER • THE SCORCH TRIALS • THE DEATH CURE • THE KILL ORDER • THE FEVER CODE",
                "DE #1 NEW YORK TIMES BESTSELLING MAZE RUNNER SERIE • Een tiener zonder geheugen moet door een dodelijk doolhof navigeren om te overleven in boek één van dit post-apocalyptische fenomeen. '[Een] mysterieuze survivalsaga die gepassioneerde fans beschrijven als een fusie van Lord of the Flies [en] The Hunger Games' (Entertainment Weekly) Wanneer Thomas wakker wordt in de lift, is het enige dat hij zich kan herinneren zijn naam. Hij is omringd door vreemden - jongens van wie de herinneringen ook verdwenen zijn. Buiten de torenhoge stenen muren die hen omringen, is een grenzeloos, steeds veranderend doolhof. Het is de enige uitweg - en niemand heeft het ooit levend overleefd. Dan arriveert er een meisje. Het eerste meisje ooit. En de boodschap die ze overbrengt is angstaanjagend: Onthoud. Overleef. Ren. Zoek naar meer boeken in de blockbuster Maze Runner-serie: THE MAZE RUNNER • THE SCORCH TRIALS • DE DOODSKUUR • HET DODENBEVEL • DE KOORTSCODE",    "http://books.google.com/books/content?id=njUmMBBedMoC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72M-VHPk1E5MnwEF2mHoagxi6cjAalz5zevHKHul_RSxAXZP1oK7RUmUGaVO-zOqmOvOZ0outnkJ8LfDDdOcSkh0ZoveB7FfYEpAXZKqve5HkUUffAVzdXWA6ExL7WO7t-_GR3F&source=gbs_api",
                LocalDate.parse("2009-10-06"),
                "English",
                400,
                Set.of("paperback"),
                Set.of(author21),
                Set.of(political, romance, classics, satire, fantasy),
                publisher18,
                true);
        productRepository.saveAll(List.of(product0, product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17, product18, product19, product20));

        Product p1 = new Product(
                "The Hunger Games",
                BigDecimal.valueOf(24.99),
                200,
                "9351035964",
                "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation. The Hunger Games is an annual event in which one boy and one girl aged 12–18 from each of the twelve districts surrounding the Capitol are selected by lottery to compete in a televised battle royale to the death. The book received critical acclaim from major reviewers and authors. It was praised for its plot and character development. In writing The Hunger Games, Collins drew upon Greek mythology, Roman gladiatorial games, and contemporary reality television for thematic content. The novel won many awards, including the California Young Reader Medal, and was named one of Publishers Weekly's Best Books of the Year in 2008. The Hunger Games was first published in hardcover on September 14, 2008, by Scholastic, featuring a cover designed by Tim O'Brien.",
                "The Hunger Games is een dystopische roman uit 2008 van de Amerikaanse schrijfster Suzanne Collins. Het verhaal wordt verteld vanuit het perspectief van de 16-jarige Katniss Everdeen, die in de toekomstige, post-apocalyptische natie Panem in Noord-Amerika woont. Het Capitool, een hoogontwikkelde metropool, oefent politieke controle uit over de rest van de natie. De Hongerspelen zijn een jaarlijks evenement waarbij één jongen en één meisje van 12-18 jaar uit elk van de twaalf districten rond het Capitool via loting worden geselecteerd om deel te nemen aan een op televisie uitgezonden strijd op leven en dood. Het boek kreeg lovende kritieken van belangrijke recensenten en auteurs. Het werd geprezen om zijn plot en karakterontwikkeling. Bij het schrijven van The Hunger Games putte Collins inspiratie uit de Griekse mythologie, Romeinse gladiatorenspelen en hedendaagse reality-tv. De roman won vele prijzen, waaronder de California Young Reader Medal, en werd in 2008 door Publishers Weekly uitgeroepen tot een van de beste boeken van het jaar. The Hunger Games werd voor het eerst gepubliceerd als hardcover op 14 september 2008 door Scholastic, met een cover ontworpen door Tim O'Brien.",
                "https://covers.openlibrary.org/b/id/14807306-L.jpg",
                LocalDate.of(2014, 11, 10),
                "english",
                384,
                Set.of("paperback"),
                Set.of(author22),
                Set.of(fiction, scifi, fantasy, drama, humor, exploratory),
                publisher19,
                true);

        Product p2 = new Product(
                "The fault in our stars",
                BigDecimal.valueOf(14.99),
                5,
                "0525478817",
                "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten. Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning-author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.",
                "Ondanks het tumor-krimpende medische wonder dat haar een paar jaar heeft gegeven, is Hazel nooit anders dan terminaal geweest, haar laatste hoofdstuk vastgelegd bij diagnose. Maar wanneer een prachtige plotwending genaamd Augustus Waters plotseling verschijnt bij de Support Group voor Kankerpatiënten, staat Hazels verhaal op het punt volledig herschreven te worden. Inzichtelijk, gedurfd, oneerbiedwaardig en rauw, The Fault in Our Stars is het meest ambitieuze en hartverscheurende werk van bekroond auteur John Green tot nu toe, dat op briljante wijze de grappige, spannende en tragische bezigheid van leven en verliefd zijn verkent.",
                "https://covers.openlibrary.org/b/id/7285167-L.jpg",
                LocalDate.of(2012, 1, 10),
                "english",
                318,
                Set.of("paperback", "hardcover"),
                Set.of(author23),
                Set.of(fiction, romance, nonfiction),
                publisher20,
                true);

        Product p3 = new Product(
                "Harry Potter and the Sorcerer's Stone",
                BigDecimal.valueOf(39.99),
                0,
                "059035342x",
                "When mysterious letters start arriving on his doorstep, Harry Potter has never heard of Hogwarts School of Witchcraft and Wizardry. They are swiftly confiscated by his aunt and uncle. Then, on Harry's eleventh birthday, a strange man bursts in with some important news: Harry Potter is a wizard and has been awarded a place to study at Hogwarts. And so the first of the Harry Potter adventures is set to begin.",
                "Wanneer er mysterieuze brieven op zijn deurmat beginnen te verschijnen, heeft Harry Potter nog nooit gehoord van Zweinsteins Hogeschool voor Hekserij en Hocus-Pocus. De brieven worden snel in beslag genomen door zijn tante en oom. Dan, op Harry's elfde verjaardag, komt een vreemde man binnen met belangrijk nieuws: Harry Potter is een tovenaar en heeft een plaats gekregen om te studeren aan Zweinstein. En zo begint het eerste avontuur van Harry Potter.",
                "https://covers.openlibrary.org/b/id/14656853-L.jpg",
                LocalDate.of(1999, 9, 1),
                "english",
                309,
                Set.of("paperback"),
                Set.of(author24),
                Set.of(fantasy, fiction, mystery, humor, action, drama, scifi),
                publisher19,
                true
        );

        Product p4 = new Product(
                "To Kill a Mockingbird",
                BigDecimal.valueOf(18.99),
                17,
                "9780061120084",
                "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature. (back cover)",
                "De onvergetelijke roman over een jeugd in een slaperig zuidelijk stadje en de gewetenscrisis die het schokte, To Kill A Mockingbird werd zowel een onmiddellijke bestseller als een kritisch succes toen het voor het eerst werd gepubliceerd in 1960. Het won de Pulitzerprijs in 1961 en werd later verfilmd tot een met een Academy Award bekroonde film, eveneens een klassieker. Meelevend, dramatisch en diep ontroerend, To Kill A Mockingbird brengt lezers naar de wortels van menselijk gedrag - naar onschuld en ervaring, vriendelijkheid en wreedheid, liefde en haat, humor en pathos. Nu met meer dan 18 miljoen exemplaren in druk en vertaald in veertig talen, claimt dit regionale verhaal van een jonge vrouw uit Alabama universele aantrekkingskracht. Harper Lee beschouwde haar boek altijd als een eenvoudig liefdesverhaal. Tegenwoordig wordt het beschouwd als een meesterwerk van de Amerikaanse literatuur. (achterflap)",
                "https://covers.openlibrary.org/b/id/14856323-L.jpg",
                LocalDate.of(1993, 1, 1),
                "english",
                376,
                Set.of("paperback", "hardcover"),
                Set.of(author25),
                Set.of(scifi, fiction),
                publisher21,
                true
        );

        Product p5 = new Product(
                "1984",
                BigDecimal.valueOf(15.99),
                100,
                "9780451524935",
                "1984, published in 1949, is a dystopian novel set in a totalitarian society ruled by Big Brother. The novel explores themes of surveillance, propaganda, and the loss of individuality.",
                "1984, gepubliceerd in 1949, is een dystopische roman die zich afspeelt in een totalitaire samenleving die wordt geregeerd door Grote Broer. De roman verkent thema's als surveillance, propaganda en het verlies van individualiteit.",
                "https://covers.openlibrary.org/b/id/14845126-M.jpg",
                LocalDate.of(1949, 6, 8),
                "english",
                328,
                Set.of("paperback", "hardcover"),
                Set.of(author24),
                Set.of(scifi, fiction),
                publisher22,
                true
        );

        Product p6 = new Product(
                "Pride and Prejudice",
                BigDecimal.valueOf(12.99),
                75,
                "9780141439518",
                "Pride and Prejudice, first published in 1813, is a romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book.",
                "Pride and Prejudice (Trots en Vooroordeel), voor het eerst gepubliceerd in 1813, is een romantische zedenroman geschreven door Jane Austen. De roman volgt de karakterontwikkeling van Elizabeth Bennet, de dynamische protagonist van het boek.",
                "https://covers.openlibrary.org/b/id/14855252-L.jpg",
                LocalDate.of(1813, 1, 28),
                "english",
                279,
                Set.of("paperback", "hardcover"),
                Set.of(author25),
                Set.of(scifi, fiction),
                publisher23,
                false
        );

        Product p7 = new Product(
                "The Great Gatsby",
                BigDecimal.valueOf(10.99),
                50,
                "9780743273565",
                "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
                "The Great Gatsby is een roman uit 1925 van de Amerikaanse schrijver F. Scott Fitzgerald. De roman speelt zich af in het Jazz-tijdperk op Long Island en beschrijft de interacties van verteller Nick Carraway met de mysterieuze miljonair Jay Gatsby en Gatsby's obsessie om herenigd te worden met zijn voormalige geliefde, Daisy Buchanan.",
                "https://covers.openlibrary.org/b/id/12364437-M.jpg",
                LocalDate.of(1925, 4, 10),
                "english",
                180,
                Set.of("paperback", "hardcover"),
                Set.of(author26),
                Set.of(fiction, drama),
                publisher19,
                false
        );

        Product p8 = new Product(
                "Moby Dick",
                BigDecimal.valueOf(12.99),
                30,
                "9781503280786",
                "Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge against Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.",
                "Moby-Dick; of, De Walvis is een roman uit 1851 van de Amerikaanse schrijver Herman Melville. Het boek is het verhaal van de zeeman Ishmael over de obsessieve zoektocht van Ahab, kapitein van het walvisvaardersschip Pequod, naar wraak op Moby Dick, de reusachtige witte potvis die tijdens de vorige reis van het schip Ahabs been bij de knie heeft afgebeten.",
                "https://covers.openlibrary.org/b/id/12621992-M.jpg",
                LocalDate.of(1851, 10, 18),
                "english",
                635,
                Set.of("paperback", "hardcover"),
                Set.of(author27),
                Set.of(fiction, adventure),
                publisher20,
                true
        );

        Product p9 = new Product(
                "War and Peace",
                BigDecimal.valueOf(19.99),
                20,
                "9780199232765",
                "War and Peace is a novel by the Russian author Leo Tolstoy, published from 1865 to 1869. It is regarded as one of Tolstoy's finest works and as one of the greatest novels ever written.",
                "Oorlog en Vrede is een roman van de Russische auteur Leo Tolstoj, gepubliceerd van 1865 tot 1869. Het wordt beschouwd als een van Tolstojs beste werken en als een van de grootste romans ooit geschreven.",
                "https://covers.openlibrary.org/b/id/7914757-M.jpg",
                LocalDate.of(1869, 1, 1),
                "english",
                1225,
                Set.of("paperback", "hardcover"),
                Set.of(author28),
                Set.of(fiction, historical),
                publisher21,
                true
        );

        Product p10 = new Product(
                "The Catcher in the Rye",
                BigDecimal.valueOf(8.99),
                40,
                "9780316769488",
                "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst and alienation, and as a critique on superficiality in society.",
                "De Vanger in het Graan is een roman van J.D. Salinger, gedeeltelijk gepubliceerd in serievorm in 1945-1946 en als roman in 1951. Het was oorspronkelijk bedoeld voor volwassenen, maar wordt vaak gelezen door adolescenten vanwege de thema's van angst en vervreemding, en als een kritiek op oppervlakkigheid in de samenleving.",
                "https://covers.openlibrary.org/b/id/14845128-M.jpg",
                LocalDate.of(1951, 7, 16),
                "english",
                277,
                Set.of("paperback", "hardcover"),
                Set.of(author29),
                Set.of(fiction, drama),
                publisher22,
                true
        );

        Product p11 = new Product(
                "Brave New World",
                BigDecimal.valueOf(9.99),
                60,
                "9780060850524",
                "Brave New World is a dystopian social science fiction novel by English author Aldous Huxley, written in 1931 and published in 1932. Largely set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy, the novel anticipates huge scientific developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a dystopian society which is challenged by only a single individual: the story's protagonist.",
                "Brave New World (Heerlijke Nieuwe Wereld) is een dystopische sociaal-wetenschappelijke fictieroman van de Engelse auteur Aldous Huxley, geschreven in 1931 en gepubliceerd in 1932. De roman speelt grotendeels in een futuristische Wereldstaat, bewoond door genetisch gemodificeerde burgers en een op intelligentie gebaseerde sociale hiërarchie. Het boek anticipeert op enorme wetenschappelijke ontwikkelingen in reproductietechnologie, slaapleermethoden, psychologische manipulatie en klassieke conditionering die samen een dystopische samenleving vormen die slechts door één individu wordt uitgedaagd: de protagonist van het verhaal.",
                "https://covers.openlibrary.org/b/id/14846947-M.jpg",
                LocalDate.of(1932, 1, 1),
                "english",
                311,
                Set.of("paperback", "hardcover"),
                Set.of(author30),
                Set.of(fiction, scifi),
                publisher23,
                true
        );

        Product p12 = new Product(
                "Jane Eyre",
                BigDecimal.valueOf(11.99),
                45,
                "9780141441146",
                "Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name \"Currer Bell\", on 16 October 1847, by Smith, Elder & Co. of London. The first American edition was published the following year by Harper & Brothers of New York.",
                "Jane Eyre is een roman van de Engelse schrijfster Charlotte Brontë, gepubliceerd onder het pseudoniem \"Currer Bell\", op 16 oktober 1847, door Smith, Elder & Co. uit Londen. De eerste Amerikaanse editie werd het volgende jaar gepubliceerd door Harper & Brothers uit New York.",
                "https://covers.openlibrary.org/b/id/11657937-L.jpg",
                LocalDate.of(1847, 10, 16),
                "english",
                500,
                Set.of("paperback", "hardcover"),
                Set.of(author31),
                Set.of(fiction, romance),
                publisher19,
                true
        );

        Product p13 = new Product(
                "The Hobbit",
                BigDecimal.valueOf(14.99),
                70,
                "9780547928227",
                "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
                "De Hobbit, of Heen en Weer Terug is een fantasieroman voor kinderen van de Engelse auteur J.R.R. Tolkien. Het werd gepubliceerd op 21 september 1937 met groot kritisch succes, werd genomineerd voor de Carnegie Medal en ontving een prijs van de New York Herald Tribune voor beste jeugdfictie.",
                "https://covers.openlibrary.org/b/id/14627222-M.jpg",
                LocalDate.of(1937, 9, 21),
                "english",
                310,
                Set.of("paperback", "hardcover"),
                Set.of(author32),
                Set.of(fantasy, adventure),
                publisher20,
                true
        );

        Product p14 = new Product(
                "Crime and Punishment",
                BigDecimal.valueOf(13.99),
                35,
                "9780140449136",
                "Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume.",
                "Misdaad en Straf is een roman van de Russische auteur Fjodor Dostojevski. Het werd voor het eerst gepubliceerd in het literaire tijdschrift De Russische Boodschapper in twaalf maandelijkse afleveringen gedurende 1866. Later werd het gepubliceerd als één enkel boekdeel.",
                "https://covers.openlibrary.org/b/id/12622046-M.jpg",
                LocalDate.of(1866, 1, 1),
                "english",
                671,
                Set.of("paperback", "hardcover"),
                Set.of(author33),
                Set.of(fiction, psychological),
                publisher21,
                true
        );

        Product p15 = new Product(
                "The Odyssey",
                BigDecimal.valueOf(16.99),
                25,
                "9780140268867",
                "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work ascribed to Homer. The Odyssey is fundamental to the modern Western canon; it is the second-oldest extant work of Western literature, while the Iliad is the oldest.",
                "De Odyssee is een van de twee grote oud-Griekse epische gedichten die aan Homerus worden toegeschreven. Het is gedeeltelijk een vervolg op de Ilias, het andere werk dat aan Homerus wordt toegeschreven. De Odyssee is fundamenteel voor de moderne westerse canon; het is het op een na oudste nog bestaande werk van de westerse literatuur, terwijl de Ilias het oudste is.",
                "https://archive.org/download/odyssey0000unse_c6h1/page/cover_w500_h500.jpg",
                LocalDate.of(-800, 1, 1),
                "english",
                541,
                Set.of("paperback", "hardcover"),
                Set.of(author34),
                Set.of(fiction, adventure),
                publisher22,
                true
        );
        productRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15));
    }
}
