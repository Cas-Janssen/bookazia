import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface FaqItem {
  questionKey: string;
  answerKey: string;
  category: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FormsModule, RouterModule, TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'all';

  faqItems: FaqItem[] = [
    {
      questionKey: 'FAQ.ITEMS.SHIPPING_NORMAL.QUESTION',
      answerKey: 'FAQ.ITEMS.SHIPPING_NORMAL.ANSWER',
      category: 'shipping',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.SHIPPING_EXPRESS.QUESTION',
      answerKey: 'FAQ.ITEMS.SHIPPING_EXPRESS.ANSWER',
      category: 'shipping',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.TRACK_ORDER.QUESTION',
      answerKey: 'FAQ.ITEMS.TRACK_ORDER.ANSWER',
      category: 'orders',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.CHANGE_ORDER.QUESTION',
      answerKey: 'FAQ.ITEMS.CHANGE_ORDER.ANSWER',
      category: 'orders',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.GIFT_WRAPPING.QUESTION',
      answerKey: 'FAQ.ITEMS.GIFT_WRAPPING.ANSWER',
      category: 'orders',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.EBOOKS.QUESTION',
      answerKey: 'FAQ.ITEMS.EBOOKS.ANSWER',
      category: 'products',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.RESET_PASSWORD.QUESTION',
      answerKey: 'FAQ.ITEMS.RESET_PASSWORD.ANSWER',
      category: 'account',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.INTERNATIONAL_SHIPPING.QUESTION',
      answerKey: 'FAQ.ITEMS.INTERNATIONAL_SHIPPING.ANSWER',
      category: 'shipping',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.REQUEST_BOOK.QUESTION',
      answerKey: 'FAQ.ITEMS.REQUEST_BOOK.ANSWER',
      category: 'products',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.PAYMENT_METHODS.QUESTION',
      answerKey: 'FAQ.ITEMS.PAYMENT_METHODS.ANSWER',
      category: 'orders',
      isOpen: false,
    },
    {
      questionKey: 'FAQ.ITEMS.UPDATE_ACCOUNT.QUESTION',
      answerKey: 'FAQ.ITEMS.UPDATE_ACCOUNT.ANSWER',
      category: 'account',
      isOpen: false,
    },
  ];

  filteredQuestions: FaqItem[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.filteredQuestions = [...this.faqItems];
  }

  toggleQuestion(question: FaqItem): void {
    question.isOpen = !question.isOpen;
  }

  filterQuestions(): void {
    if (!this.searchQuery && this.selectedCategory === 'all') {
      this.filteredQuestions = [...this.faqItems];
      return;
    }

    const query = this.searchQuery.toLowerCase();

    this.filteredQuestions = this.faqItems.filter((item) => {
      const matchesCategory =
        this.selectedCategory === 'all' ||
        item.category === this.selectedCategory;

      if (!query) {
        return matchesCategory;
      }

      const translatedQuestion = this.translate
        .instant(item.questionKey)
        .toLowerCase();
      const translatedAnswer = this.translate
        .instant(item.answerKey)
        .toLowerCase();

      const matchesSearch =
        translatedQuestion.includes(query) || translatedAnswer.includes(query);

      return matchesCategory && matchesSearch;
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterQuestions();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterQuestions();
  }

  getTranslatedQuestion(item: FaqItem): string {
    return this.translate.instant(item.questionKey);
  }

  getTranslatedAnswer(item: FaqItem): string {
    return this.translate.instant(item.answerKey);
  }
}
