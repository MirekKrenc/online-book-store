package krenc.mirek.onlinebookstore.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="tbl_book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sku;
    private String name;
    private String description;
    @Column(name="unit_price")
    private BigDecimal unitPrice;
    @Column(name="image_url")
    private String imageUrl;
    private boolean active;
    @Column(name = "units_in_stock")
    private int unitsInStock;
    @Column(name="date_created")
    private LocalDateTime createdOn;
    @Column(name="last_updated")
    private LocalDateTime updateOn;

    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    private BookCategory bookCategory;

    public Book(String sku, String name, String description, BigDecimal unitPrice, String imageUrl, boolean active, int unitsInStock, LocalDateTime createdOn, LocalDateTime updateOn) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitsInStock = unitsInStock;
        this.createdOn = createdOn;
        this.updateOn = updateOn;
    }

    public Book(String sku, String name, String description, BigDecimal unitPrice, String imageUrl, boolean active, int unitsInStock, LocalDateTime createdOn, LocalDateTime updateOn, BookCategory bookCategory) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitsInStock = unitsInStock;
        this.createdOn = createdOn;
        this.updateOn = updateOn;
        this.bookCategory = bookCategory;
    }

    public Book() {
    }

    public BookCategory getBookCategory() {
        return bookCategory;
    }

    public void setBookCategory(BookCategory bookCategory) {
        this.bookCategory = bookCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getUnitsInStock() {
        return unitsInStock;
    }

    public void setUnitsInStock(int unitsInStock) {
        this.unitsInStock = unitsInStock;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDateTime getUpdateOn() {
        return updateOn;
    }

    public void setUpdateOn(LocalDateTime updateOn) {
        this.updateOn = updateOn;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", sku='" + sku + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", unitPrice=" + unitPrice +
                ", imageUrl='" + imageUrl + '\'' +
                ", active=" + active +
                ", unitsInStock=" + unitsInStock +
                ", createdOn=" + createdOn +
                ", updateOn=" + updateOn +
                ", bookCategory=" + bookCategory +
                '}';
    }
}
