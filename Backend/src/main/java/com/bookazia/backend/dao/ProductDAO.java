package com.bookazia.backend.dao;

import com.bookazia.backend.dto.ProductDTO;
import com.bookazia.backend.models.Author;
import com.bookazia.backend.models.Category;
import com.bookazia.backend.models.Product;
import com.bookazia.backend.models.Publisher;
import com.bookazia.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProductDAO {
    private final ProductRepository productRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;

    public ProductDAO(ProductRepository productRepository, UserService userService, CategoryRepository categoryRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
    }


    public List<Product> getAllProducts() {
        if (userService.checkIfUserIsAdmin()) {
            return this.productRepository.findAll();
        }
        else{
        return this.productRepository.findAll().stream()
                .filter(Product::isEnabled)
                .collect(Collectors.toList());
        }
    }

    public Product getSpecificProduct(Long id) {
        Optional<Product> productOptional = this.productRepository.findProductById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            if (userService.checkIfUserIsAdmin()) {
                return product;
            }
            else {
                if (product.isEnabled()) {
                    return product;
                } else {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Product is not available!");
                }
            }
        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Product does not exist!");
        }
    }

    public Product addProduct(ProductDTO productDTO) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to add a Product"
            );
        }
        validateProductDTO(productDTO);
        Product product = new Product(
                productDTO.title,
                productDTO.price,
                productDTO.stock,
                productDTO.isbn,
                productDTO.descriptionEn,
                productDTO.descriptionNl,
                productDTO.CoverImgUrl,
                productDTO.publicationDate,
                productDTO.originalLanguage,
                productDTO.pages,
                productDTO.versions,
                null,
                null,
                null,
                productDTO.isEnabled
        );

        return setCategoriesAuthorsAndPublishers(productDTO, product);
    }

    private Product setCategoriesAuthorsAndPublishers(ProductDTO productDTO, Product product) {
        if (productDTO.categoryIds != null && !productDTO.categoryIds.isEmpty()) {
            Set<Category> categories = productDTO.categoryIds.stream()
                    .map(categoryId -> categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.BAD_REQUEST,
                                    "Category with ID " + categoryId + " not found")))
                    .collect(Collectors.toSet());
            product.setCategories(categories);
        }

        if (productDTO.authorIds != null && !productDTO.authorIds.isEmpty()) {
            Set<Author> authors = productDTO.authorIds.stream()
                    .map(authorId -> authorRepository.findById(authorId)
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.BAD_REQUEST,
                                    "Author with ID " + authorId + " not found")))
                    .collect(Collectors.toSet());
            product.setAuthors(authors);
        }

        if (productDTO.publisherId != null) {
            Publisher publisher = publisherRepository.findById(productDTO.publisherId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Publisher with ID " + productDTO.publisherId + " not found"));
            product.setPublisher(publisher);
        }

        product.setEnabled(productDTO.isEnabled);

        this.productRepository.save(product);
        return product;
    }

    private void validateProductDTO(ProductDTO productDTO) {
        List<String> errors = new ArrayList<>();

        if (productDTO.title == null || productDTO.title.trim().isEmpty()) {
            errors.add("Title cannot be empty");
        }
        if (productDTO.price == null) {
            errors.add("Price cannot be null");
        } else if (productDTO.price.floatValue() <= 0) {
            errors.add("Price must be greater than zero");
        }
        if (productDTO.stock < 0) {
            errors.add("Stock cannot be negative");
        }
        if (productDTO.isbn == null || productDTO.isbn.trim().isEmpty()) {
            errors.add("ISBN cannot be empty");
        } else if (this.productRepository.findByIsbn(productDTO.isbn).isPresent()) {
            errors.add("ISBN already exists");
        }
        if (productDTO.descriptionEn == null || productDTO.descriptionEn.trim().isEmpty()) {
            errors.add("English description cannot be empty");
        }
        if (productDTO.descriptionNl == null || productDTO.descriptionNl.trim().isEmpty()) {
            errors.add("Dutch description cannot be empty");
        }
        if (productDTO.publicationDate == null) {
            errors.add("Publication date cannot be null");
        }
        if (productDTO.originalLanguage == null || productDTO.originalLanguage.trim().isEmpty()) {
            errors.add("Original language cannot be empty");
        }
        if (productDTO.authorIds == null || productDTO.authorIds.isEmpty()) {
            errors.add("At least one author is required");
        }
        if (productDTO.categoryIds == null || productDTO.categoryIds.isEmpty()) {
            errors.add("At least one category is required");
        }
        if (productDTO.publisherId == null) {
            errors.add("Publisher is required");
        }
        if (!errors.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.join("; ", errors)
            );
        }
    }
    public Product updateProduct(Long id, ProductDTO productDTO) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to edit a Product"
            );
        }
        Optional<Product> productOptional = this.productRepository.findProductById(id);
        if (productOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Product does not exist!"
            );
        }
        Product product = productOptional.get();
        List<String> errors = new ArrayList<>();

        if (productDTO.isbn != null && !productDTO.isbn.equals(product.getIsbn())) {
            Optional<Product> existingProductWithIsbn = productRepository.findByIsbn(productDTO.isbn);
            if (existingProductWithIsbn.isPresent() && !existingProductWithIsbn.get().getIsbn().equals(productDTO.isbn)) {
                errors.add("ISBN already exists for another product");
            }
        }
        if (productDTO.price != null && productDTO.price.floatValue() <= 0) {
            errors.add("Price must be greater than zero");
        }
        if (productDTO.stock < 0) {
            errors.add("Stock cannot be negative");
        }
        if (!errors.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    String.join("; ", errors)
            );
        }
        if (productDTO.title != null) {
            product.setTitle(productDTO.title);
        }
        if (productDTO.price != null) {
            product.setPrice(productDTO.price);
        }
        if (productDTO.stock >= 0) {
            product.setStock(productDTO.stock);
        }
        if (productDTO.isbn != null) {
            product.setIsbn(productDTO.isbn);
        }
        if (productDTO.descriptionEn != null) {
            product.setDescriptionEn(productDTO.descriptionEn);
        }
        if (productDTO.descriptionNl != null) {
            product.setDescriptionNl(productDTO.descriptionNl);
        }
        if (productDTO.CoverImgUrl != null) {
            product.setCoverImgUrl(productDTO.CoverImgUrl);
        }
        if (productDTO.publicationDate != null) {
            product.setPublicationDate(productDTO.publicationDate);
        }
        if (productDTO.originalLanguage != null) {
            product.setOriginalLanguage(productDTO.originalLanguage);
        }
        if (productDTO.pages >= 1) {
            product.setPages(productDTO.pages);
        }

        if (productDTO.versions != null) {
            product.setVersion(productDTO.versions);
        }
        return setCategoriesAuthorsAndPublishers(productDTO, product);
    }

    public List<Product> searchProducts(String query) {
        List<Product> productsByTitle = this.productRepository.findByTitleContainingIgnoreCase(query);
        List<Product> productsByAuthor = this.productRepository.findByAuthorsFirstNameContainingIgnoreCaseOrAuthorsLastNameContainingIgnoreCase(query, query);
        List<Product> productsByIsbn = this.productRepository.findByIsbnContaining(query);
        List<Product> productsByCategory = this.productRepository.findByCategoriesNameEnContainingIgnoreCaseOrCategoriesNameNlContainingIgnoreCase(query, query);

        List<Product> combinedResults = new ArrayList<>(productsByTitle);
        for (Product product : productsByAuthor) {
            if (!combinedResults.contains(product)) {
                combinedResults.add(product);
            }
        }
        for (Product product: productsByIsbn) {
            if (!combinedResults.contains(product)) {
                combinedResults.add(product);
            }
        }
        for (Product product: productsByCategory) {
            if (!combinedResults.contains(product)) {
                combinedResults.add(product);
            }
        }

        if (userService.checkIfUserIsAdmin()) {
            return combinedResults;
        } else {
            return combinedResults.stream().filter(Product::isEnabled).toList();
        }
    }

    public Product deleteProduct(Long id) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to delete a Product"
            );
        }

        Optional<Product> productOptional = this.productRepository.findProductById(id);
        if (productOptional.isPresent()) {
            Product foundProduct = productOptional.get();
            foundProduct.setEnabled(false);
            this.productRepository.save(foundProduct);;
            return foundProduct;

        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Product does not exists!"
            );
        }
    }

    public Product updateProductStatus(long id) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to reactivate a Product"
            );
        }
        Optional<Product> productOptional = this.productRepository.findProductById(id);
        if (productOptional.isPresent()) {
            Product foundProduct = productOptional.get();
            if (foundProduct.isEnabled()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Product is already enabled!"
                );
            };
            foundProduct.setEnabled(true);
            return this.productRepository.save(foundProduct);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Product does not exists!"
            );
        }
    }
}
