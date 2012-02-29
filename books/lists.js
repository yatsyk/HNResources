//http://ycombinator.com/lib.html
//http://sivers.org/book
//http://personalmba.com/best-business-books/
//http://www.codinghorror.com/blog/2004/02/recommended-reading-for-developers.html

var lists = [
	{
    author: 'Joel Spolsky',
    author_link: 'http://www.joelonsoftware.com/',
		link: 'http://www.joelonsoftware.com/navLinks/fog0000000262.html',
		title: 'Book Reviews',
    info: '',
		books: 'peopleware manmonth rapid code_complete pragmatic_programmer microserfs zen_and_art godel_escher_bach pattern_lang ui_design_for_programmers '+
           'dont_make_me_think about_face design_everyday_things design_web_usability random_walk growing_business non_designer_design_book influence ' +
           'helplessness code k_and_r'
	}, 
	{
    author: 'Jeff Atwood',
    author_link: 'http://www.codinghorror.com/',
    info: '',
		link: 'http://www.codinghorror.com/blog/2004/02/recommended-reading-for-developers.html',
		title: 'Recommended Reading for Developers',
		books: 'code_complete pragmatic_programmer rapid mastering_regex visual_explanations the_visual_display_of_qi design_web_usability programming_pearls gui_bloopers inmater_are_running '+
           'about_face design_everyday_things peopleware dont_make_me_think manmonth'
	}, 
	{
    author: 'Joel Spolsky',
    author_link: 'http://www.joelonsoftware.com/',
    info: '',
		link: 'http://www.joelonsoftware.com/articles/FogCreekMBACurriculum.html', 
		title: 'Reading List: Fog Creek Software Management Training Program', 
    books: 'manmonth dont_make_me_think growing_business dec_is_dead applyed_cryptography philip_and_alex testing_computer_software design_for_community '+
           'version_control_with_subversion non_designer_design_book pragmatic_programmer measuring_and_managing_perfomance facts_and_fallacies_of_software_engineering '+
           'hackers_and_painters competing_on_internet_time inmater_are_running design_everyday_things difference_between_god_and_ellison breaking_windows '+
           'just_for_fun on_a_roll first_20m random_excess show_stopper the_leap digital_hastlers in_search_of_stupidity startups peopleware mac_way '+
           'microsoft_rebooted speeding_the_net aol dot_bomb new_thing burn_rate accidental_empires revolution_in_the_valley anatomy_of_buzz death_march '+
           'secrets_of_consulting rules_for_revolutionaries positioning manager_pool ben_and_jerrys the_22_immutable_laws_of_marketing goal critical_chain '+
           'microserfs product_marketing_handbook slack art_of_start business_of_software random_walk dog_years inside_intuit direct_from_dell '+
           'making_technical_sale selling_air crossing_the_chasm four_days_with_deming amazonia paypal_wars the_search the_tipping_point '+
           'the_fall_of_advertising high_stakes emyth one_min_manager getting_to_yes essentials_of_accounting influence geeks portable_mba '+
           'little_book_of_selling how_to_win_friends'
	},
	{
		link: 'http://sivers.org/book', 
		title: 'Books I’ve finished recently', 
    author: 'Derek Sivers',
    info: '',
    author_link: 'http:/sivers.org',
		books: ('personal_mba seeking_wisdom stoic_joy stubling_on_happiness war_of_art developing_world thinking_fast_and_slow lean_startup power_of_full_engagement '+
          'what_got_you_there drive switch happiness_hypothesis geography_of_bliss investor_manifesto how_we_decide sum influence time_paradox '+
          'personal_development_for_smart_people predictably_irrational four_hours_work_week wisdom_of_crouds paradox_of_choice made_to_stick '+
          'innovators_solution small_is_new_big art_of_portability emyth willpower moonwalking_einstein poke_the_box hackers_and_painters '+
          'confessions_of_public_speacker talent_code ignore_everybody what_would_google_do crowdsourcing smartest_ivestment_book wikinomics '+
          'MeatballSundae Execution GettingThingsDone 48LawsOfPower NotSoSmart DoTheWork PracticingMind 4HourBody Mindset StartSmallStaySmall '+
          'GoodBrainGreat IWillTeachYouToBeRich BusinessStrippedBare TalentIsOverrated NeverEatAlone RealityCheck YouInc UltimateSalesMachine '+
          'FourPillarsOfInvesting ArtOfLearning HereComesEverybody MaximumAchievement GiftToMyChildren Linchpin CognitiveSurplus ArtAndFear '+
          'SelfishGene Nudge OnWriting BeingLogical Pomodoro PragmaticThinking BigMoneyMistakes BornToRun Outliers ChinaStudy LuckyOrSmart '+
          'PowerOfLess Tribes HowToTalkToAnyone BrainRules CutToTheChase MagicOfThinkingBig HowToGetRich CultingOfBrands DontMakeMeThink KnowHow '+
          'ProjectManagement LittleBets FailSafeInvesting Focus UpsideOfIrrationality ProfitZone Overachievement CultureCode SpeakingOfIndia RichardBranson '+
          'ChecklistManifesto HiringSmart InnerEconomist CausingAScene HowToBeABillionaire Enough ManagementOfTheAbsurd FooledByRandomness ObsoleteEmployee MillionaireMind').toLowerCase()
	}, 
];

var bookCoverTemplate = _.template(
"<li  data-id='<%= data_id %>'><a href='<%= link %>'><div class='img'><img src=\"<%= src %>\" alt='<%= alt %>' /></div><div class='title'><%= title %></div></a></li>"
)
var listCheckTemplate = _.template(
  "<tr><td><input id='<%= id %>' type='checkbox'></td><td><b><a href='<%= link %>'><%= title %></a></b> by <a href='<%= author_link %>'><%= author %></a><br/><%= info %></td></tr>"
)

$(document).ready(function() {
  var out = $('.out');

  var updateBooks = function(ids) {
    var rr = [];
    rr.push("<ul style='display: none;' class=\"destination books_list\">")
    $.each(ids, function(ii, id) {
      console.info("id="+id);
      if(books[id]) {
        var book = books[id];
        var r = bookCoverTemplate({title: book.title, src: book.medium_image, alt: book.title + "\n" + book.author, link: book.detail_url, data_id: id});
        rr.push(r);
      }
    });
    rr.push("</ul>");
    var dest = $(rr.join(""));
    var src = $('.source');
    src.after(dest);
    src.quicksand(".destination li", {}, function() {
      dest.remove();
    });
  };
  var setBooksAccordingToCheckboxes = function() {
    var res = [];
    $.each(lists, function(iii, l) {
      if ($('#id'+iii).prop('checked')) {
        res.push(l.books);
      }
    });
    var ids = _.uniq(res.join(" ").split(' ')).sort();
    updateBooks(ids);
  };
  $('.selects').append('<table><tbody /></table>');
  var tbody = $('.selects tbody');
  $.each(lists, function(i, lst) {
    lst.id = "id"+i;
    var row = $(listCheckTemplate(lst))
    tbody.append(row);
    var check = row.find('input');
    var checked = _.isUndefined(store.get('id'+i)) ? (i < 2) : store.get('id'+i);
    check.prop('checked', checked);
    check.change(function() {
      var checked = check.prop('checked')
      store.set('id'+i, checked);
      setBooksAccordingToCheckboxes();
    });
  });
  setBooksAccordingToCheckboxes();
});

